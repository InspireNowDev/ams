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
    // credentials setup

    // home page setup
    {
        path: '/Profile',
        beforeEnter: checkCredentials,
        name: 'Profile',
        component: () => import("@/pages/protected/Profile.vue")
    },
    {
        path: '/Home',
        beforeEnter: checkCredentials,
        name: 'Home',
        component: () => import("@/pages/protected/Home.vue")
    },

    // protected view setup
    {
        path: '/users',
        beforeEnter: checkAdmin,
        name: 'users',
        component: () => import("@/pages/admin/Users.vue")
    },
    {
        path: '/admins',
        beforeEnter: checkSuper,
        name: 'admins',
        component: () => import("@/pages/adminSuper/Admins.vue")
    },
    {
        path: '/roles',
        beforeEnter: checkAdmin,
        name: 'roles',
        component: () => import("@/pages/admin/Roles.vue")
    },

    // route control setup
    {
        path: '/unauthorized',
        name: "unauthorized",
        component: () => import("@/pages/public/Unauthorized.vue")
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import("@/pages/public/PageNotFound.vue")
    },
    //reroutes to page not found page when the link does not exist 
];



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});
// function check if user logged in 
function checkCredentials(to, from, next) {
    if (to.name !== 'login' && !store.state.userLoggedIn) next({ name: 'login' })
    if (to.name === 'login' && store.state.userLoggedIn) next({ name: 'Home' })
    else next();//check user role path
}
// function check if user is admin or super admin
function checkAdmin(to, from, next) {    //if (store.state.userCredentials.userRole == "Super-admin") { console.log(store.state.userCredentials.userRole); next(); }  // they are  
    if (store.state.userLoggedIn && (store.state.userRole === "admin" || store.state.userRole === 'super-admin')) next()
    else next({ name: 'unauthorized' }); // we are authorized, continue on to the requested route
}
// function check if user is super admin
function checkSuper(to, from, next) {    //if (store.state.userCredentials.userRole == "Super-admin") { console.log(store.state.userCredentials.userRole); next(); }  // they are  
    if (store.state.userLoggedIn && store.state.userRole === "super-admin") next()
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