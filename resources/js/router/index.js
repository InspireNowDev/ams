import { createRouter, createWebHistory } from 'vue-router';
import Hellowrld from '../components/pages/Hello.vue'
import About from '../components/pages/About.vue'
import Login from "../components/pages/Login.vue"
const routes = [

    {
        path: '/',
        name: 'hello',
        component: Hellowrld
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;