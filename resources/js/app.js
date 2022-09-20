import './bootstrap';
import { createApp } from 'vue';
import app from './app.vue';
import router from './router/router.js'
import store from './store/store.js'
import axios from 'axios';
import VueAxios from 'vue-axios'

createApp(app)
    .use(router)
    .use(store)
    .use(VueAxios, axios)
    .mount('#app')