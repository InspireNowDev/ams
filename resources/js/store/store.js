import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

// Create a new store instance.
const store = createStore({

    state() {
        return {
            userLoggedIn: false,//default false
            userCredentials: {
                name: "default name",
                id: 0,
                email: "",
            },
            users:[],

            roles:[{
                    role_id : '1',
                    role_title : 'Shopper',
                    role_description : 'Role is for free user or whatever'
                },
                {
                    role_id : '2',
                    role_title : 'Manager',
                    role_description : 'Role is for free user or whatever no real reason'
                },
                {
                    role_id : '3',
                    role_title : 'Test',
                    role_description : 'Role is for free user or whatever'
                }],

                login_token: "",
                userRole: "admin",
                toasts: [],
                user_remember: false,
            }

    },
    mutations: {

        // toast notification 
        addToast(state, toast) {
            state.toasts.push(toast);
        },
        clearToast(state, title) {
            const index = state.toasts.findIndex((toast) => toast.title === title); // find toast
            state.toasts.splice(index, 1); // remove toast from array
        },
        // toast notification
        login(state, userCredentials) {
            state.userCredentials = userCredentials;
            state.userLoggedIn = true;
            state.users = [];
        },
        logout(state) {
            state.userLoggedIn = false;
            state.userCredentials = null;
            state.userRole = null;
            state.login_token = null;
        },
        token_set(state, login_token) {
            state.login_token = login_token;
        },
        role_set(state, user_role) {
            state.userRole = user_role;
        },
        setRemember(state, remember_me ){
            state.user_remember = remember_me;
        },
        // set user array
        setUsers(state, data){
            state.users = [...state.users, data];
        }
    
    },
    getters: {
        userID(state) {
            return state.userCredentials.id;
        },
        userEmail(state) {
            return state.userCredentials.email;
        },
        userName(state) {
            return state.userCredentials.name;
        },
        userRole(state) {
            return state.userRole;
        },
        logToken(state) {
            return state.login_token;
        },
        userisLoggedIn(state) {
            return state.userLoggedIn;
        },
        userRemember(state){
            return state.user_remember;
        },
        userRoles(state){
            return state.roles;
        }
    },
    setters: {
        setID(state) {

        }
    },
    plugins: [createPersistedState()]
})

export default store;