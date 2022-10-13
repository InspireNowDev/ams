import './bootstrap';
import { createApp } from 'vue';
import app from './app.vue';
import router from './router/router.js'
import store from './store/store.js'
import axios, { Axios } from 'axios';
import VueAxios from 'vue-axios'


axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    function(config){
        config.headers.common['interceptorheader'] = 'Interceptor Header ';
        config.headers['Authorization']  ='Bearer ' + localStorage.getItem("accessToken");
        return config;
    },
    function(error){

        return Promise.reject(error);
    },
)
// axios.interceptors.response.use(
//     function(config){

//         return config;
//     },
//     function(error){

//         return Promise.reject(error);
//     },
// )

//Vue.config.productionTip = false
createApp(app)
    .use(router)
    .use(store)
    .use(VueAxios, axios)
    .mount('#app');

