import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

// Create a new store instance.
const store = createStore({

    state() {
        return {
           
            userCredentials: {
                name: "default name",
                id: 0,
                email: "",
            },
                toasts: [],
                accessToken: null,
                userLoggedIn: false,//default false
                loggingIn: false,

                loginError: null,//error on login
                
                userRole: "user",
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
        },
        loginStart: (state) => {
            state.loggingIn = true;
          },
        loginStop(state, errorMessage){
            state.userLoggedIn = false;
            state.loginError = errorMessage;
        },
        updateAccessToken: (state, accessToken) => {
        state.accessToken = accessToken;
        },


        logout(state) {
            state.userLoggedIn = false;
            state.userCredentials = null;
            state.userRole = null;
            state.accessToken = null;
        },
        token_set(state, accessToken) {
            state.accessToken = accessToken;
        },
        role_set(state, user_role) {
            state.userRole = user_role;
        },
        setRemember(state, remember_me ){
            state.user_remember = remember_me;
        },
        // set user array
    },
    actions:{
        fetchAccessToken({ commit }) {
            commit('updateAccessToken', localStorage.getItem('accessToken'));
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
            return state.accessToken;
        },
        userisLoggedIn(state) {
            return state.userLoggedIn;
        },
        userRemember(state){
            return state.user_remember;
        },
    },
    setters: {
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })]
})

export default store;