import { createRouter, createWebHistory } from 'vue-router';
import Hellowrld from '../pages/Hello.vue'
import Login from "../pages/Login.vue"
import PageNotFound from "../pages/PageNotFound.vue"
//import PageNotFound from "../pages/PageNotFound.vue"
const routes = [

    {
        path: '/dashboard',
        name: 'hello',
        component: Hellowrld
    },
    {
        path: '/about',
        name: 'about',
        component: () => import("@/pages/About.vue")
        // routing can also be done this way 
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/sign-up',
        name: 'signup',
        component: () => import("@/pages/SignUp.vue")
    },
    //reroutes to page not found page when the link does not exist 
    {
        path: '/:pathMatch(.*)*',
        component: () => import("@/pages/PageNotFound.vue")
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;