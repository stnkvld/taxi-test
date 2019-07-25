import axios from 'axios';
import storage from './store/storage';

const debug = process.env.NODE_ENV !== 'production';

axios.defaults.baseURL = "/api";
axios.defaults.headers.post['Content-type'] = 'application/json';

axios.interceptors.request.use(function (config) {
    if (storage.getters['userToken']) {
        config.headers.common.Authorization = `Bearer ${storage.getters['userToken']}`;
    }
    else {
        delete config.headers.common.Authorization;
    }
    storage.dispatch('setIsLoading', true);
    storage.dispatch('setError', null);
    return config;
}, function (error) {
    console.error('Ошибка в запросе к серверу:\n', debug ? error: '');
    storage.dispatch('setIsLoading', false);
    storage.dispatch('setError', error);
    return Promise.reject(error);
});

axios.interceptors.response.use( response => {
    storage.dispatch('setIsLoading', false);
    storage.dispatch('setError', null);
    return response;
}, error => {
    storage.dispatch('setIsLoading', false);
    if (error.response) {
        switch (error.response.status) {
            case 401:
                console.error('Пользователь не авторизован\n', debug ? error : '');
                storage.dispatch('setError', 'Пользователь не авторизован');
                break;
            case 403:
                console.error('Доступ запрещён\n', debug ? error : '');
                storage.dispatch('setError', 'Доступ запрещён');
                break;
            case 405:
                console.error('Действие не поддерживается\n', debug ? error : '');
                storage.dispatch('setError', 'Действие не поддерживается');
                break;
            case 422:
                console.error('Переданные данные не прошли валидацию\n', debug ? error : '');
                storage.dispatch('setError', 'Переданные данные не прошли валидацию');
                break;
            case 500:
                console.error('Ошибка в выполнении запроса\n', debug ? error : '');
                storage.dispatch('setError', 'Ошибка в выполнении запроса');
                break;
            default:
                console.error('Непредвиденная ошибка в ответе сервера: ' + error.response.status + '\n', debug ? error : '');
                storage.dispatch('setError', 'Непредвиденная ошибка в ответе сервера');
        }
    }

    return Promise.reject(error);
});

export default axios;