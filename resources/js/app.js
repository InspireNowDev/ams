import './bootstrap';
import { createApp } from 'vue';
import app from './app.vue';
import router from './router/index'
import store from './store/store.js'
createApp(app)
    .use(router)
    .use(store)
    .mount('#app')