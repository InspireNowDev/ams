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
 axios.interceptors.response.use(
    function(config){
        console.log(config);
        return config;
    },
    function(error){
        console.log(error);
        if( error.response.request.status === 422 ){
            store.commit("addToast", {
                title: error.response.request.status,
                type: "danger",
                message: error.response.data.message,
              });
        }
        else if ( error.response.request.status === 401 ){
            store.commit("addToast", {
                title: error.response.request.status,
                type: "danger",
                message: "Wrong Username or Password",
              });
        }
        else {
            console.log( error.response.request)
        }
      
        
        return Promise.reject(error);
    },
)

//Vue.config.productionTip = false
createApp(app)
    .use(router)
    .use(store)
    .use(VueAxios, axios)
    .mount('#app');

