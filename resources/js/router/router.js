import { createRouter, createWebHistory } from 'vue-router';
import Login from "../pages/auth-pages/Login.vue"
import store from "../store/store"
const routes = [
    {
        path: '/',
        beforeEnter: checkCredentials,
        redirect: '/login'
    },//redirects to login, redirects can be done here
    {
        path: '/login',
        name: 'login',
        beforeEnter: checkCredentials,
        component: Login
    },
    {
        path: '/sign-up',
        name: 'signup',
        component: () => import("@/pages/auth-pages/SignUp.vue")
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import("@/pages/auth-pages/ForgotPassword.vue")
    },
    {
        path: '/set-password/:id/:token',
        name: 'set-password',
        component: () => import("@/pages/auth-pages/SetPassword.vue")
    },
    {
        path: '/welcome',
        beforeEnter: checkCredentials,
        name: 'welcome',
        component: () => import("@/pages/Welcome.vue")
    },
    {
        path: '/users',
        beforeEnter: checkRole,
        name: 'users',
        component: () => import("@/pages/Users.vue")
    },
    {
        path: '/unauthorized',
        name: "unauthorized",
        component: () => import("@/pages/Unauthorized.vue")
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import("@/pages/PageNotFound.vue")
    },
    //reroutes to page not found page when the link does not exist 
];



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

function checkCredentials(to, from, next) {
    if (to.name !== 'login' && !store.state.userLoggedIn) next({ name: 'login' })
    if (to.name === 'login' && store.state.userLoggedIn) next({ name: 'welcome' })
    else next();//check user role path
}
function checkRole(to, from, next) {    //if (store.state.userCredentials.userRole == "Super-admin") { console.log(store.state.userCredentials.userRole); next(); }  // they are  
    if (store.state.userLoggedIn && store.state.userRole === "admin") next()
    else next({ name: 'unauthorized' }); // we are authorized, continue on to the requested route
}

// router.beforeEach((to, from, next) => {
//     if (to.name !== 'login' && !store.state.userLoggeIin) {
//         next({ name: 'login' });
//     } else {
//         next();
//     }
// });
export default router;