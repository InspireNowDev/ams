import { createRouter, createWebHistory } from 'vue-router';
import Login from "../pages/Login.vue"

const routes = [
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
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import("@/pages/ForgotPassword.vue")
    },
    {
        path: '/set-password/:id/:token',
        name: 'set-password',
        component: () => import("@/pages/SetPassword.vue")
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import("@/pages/Welcome.vue")
    },
    {
        path: '/CRUD',
        name: 'about',
        component: () => import("@/pages/CRUD.vue")
        // routing can also be done this way 
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