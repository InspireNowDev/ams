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
            login_token: "",
            userRole: "admin",
            toasts: []
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
        }
    },
    setters: {
        setID(state) {

        }
    },
    plugins: [createPersistedState()]
})

export default store;