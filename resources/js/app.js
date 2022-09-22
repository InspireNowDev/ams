import './bootstrap';
import { createApp } from 'vue';
import app from './app.vue';
import router from './router/router.js'
import store from './store/store.js'
import axios, { Axios } from 'axios';
import VueAxios from 'vue-axios'
axios.defaults.withCredentials = true;

//Vue.config.productionTip = false
createApp(app)
    .use(router)
    .use(store)
    .use(VueAxios, axios)
    .mount('#app');

