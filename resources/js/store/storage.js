import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axiosExtension';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict: debug,
    state: {
        userName: null,
        userToken: null,
        tips: [],
        isAxiosLoading: false,
        error: null,
        geoInfo: [],
        editingGeoInfoIdx: null
    },
    getters: {
        error: state => state.error,
        userName: state => state.userName,
        userToken: state => state.userToken,
        tips: state => state.tips,
        isAxiosLoading: state => state.isAxiosLoading,
        isAuth: state => state.userName !== null && state.userToken !== null,
        geoInfo: state => state.geoInfo,
        editingGeoInfo: state => {
            return state.geoInfo[state.editingGeoInfoIdx];
        }
    },
    actions: {
        setIsLoading: function ({commit}, loadingValue) {
            commit('setIsLoading', loadingValue);
        },
        register: async function ({commit}, regData) {
            await axios.post('/auth/register', regData);
        },
        autoLogin: function({commit}) {
            commit('setAuthData');
        },
        login: async function ({commit}, loginData) {
            await axios.post('/auth/login', loginData).then(response => {
                localStorage.setItem('userName', response.data['user_name']);
                localStorage.setItem('userToken', response.data['api_token']);
                commit('setAuthData');
            });
        },
        logout: async function ({commit}) {
            await axios.post('/auth/logout').then(() => {
                localStorage.removeItem('userName');
                localStorage.removeItem('userToken');
                commit('setAuthData');
            });
        },
        getTips: async function ({commit}, address) {
            await axios.get(`/address/tips?text=${address}`).then(response => {
                commit('setTips', response.data);
            });
        },
        setError: function ({commit}, error) {
            commit('setError', error);
        },
        getGeoInfo: function ({commit}) {
            axios.get('/geo-info').then(response => {
                commit('setGeoInfo', response.data);
            });
        },
        setEditingGeoInfoIdx: function ({commit}, itemId) {
            commit('setEditingGeoInfoIdx', itemId);
        },
        editGeoInfo: async function ({commit}, itemInfo) {
            await axios.patch(`/geo-info/${itemInfo.id}`, itemInfo).then(response => {
               commit('updateGeoInfo', response.data);
            });
        },
        removeGeoInfo: async function ({commit}, itemInfo) {
            await axios.delete(`/geo-info/${itemInfo.id}`).then(response => {
               commit('removeGeoInfo', itemInfo);
            });
        }
    },
    mutations: {
        setIsLoading: function (state, value) {
            state.isAxiosLoading = value;
        },
        setAuthData: function (state) {
            state.userName = localStorage.getItem('userName');
            state.userToken = localStorage.getItem('userToken');
        },
        setTips: function (state, tipsData) {
            state.tips = tipsData;
        },
        setError: function (state, error) {
            state.error = error;
        },
        setGeoInfo: function (state, geoInfoData) {
            state.geoInfo = geoInfoData;
        },
        setEditingGeoInfoIdx: function (state, id) {
            state.editingGeoInfoIdx = state.geoInfo.findIndex(geoInfoItem => geoInfoItem.id == id);
        },
        updateGeoInfo: function (state, itemInfo) {
            const idx = state.geoInfo.findIndex(geoInfoItem => geoInfoItem.id === itemInfo.id);
            for (const key in state.geoInfo[idx]) {
                state.geoInfo[idx].key = itemInfo.key;
            }
        },
        removeGeoInfo: function (state, {id}) {
            const idx = state.geoInfo.findIndex(geoInfoItem => geoInfoItem.id === id);
            state.geoInfo.splice(idx, 1);
        }
    }
});