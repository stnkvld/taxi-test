import Vue from 'vue';
import router from './router';
import App from './components/App';

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify);

const app = new Vue({
    el: '#app',
    components: { App },
    router: router
});
