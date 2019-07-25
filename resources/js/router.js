import Vue from 'vue';
import VueRouter from 'vue-router';
import Registration from './components/Registration';
import Login from './components/Login';
import Logout from './components/Logout';
import Tips from './components/Tips';
import GeoControl from './components/GeoControl';
import GeoControlEdit from './components/GeoControlEdit';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration
        },
        {
            path: '/tips',
            name: 'tips',
            component: Tips,
        },
        {
            path: '/geo-control',
            name: 'geoControl',
            component: GeoControl
        },
        {
            path: '/geo-control/:id',
            name: 'geoControlEdit',
            component: GeoControlEdit
        }
    ],
});