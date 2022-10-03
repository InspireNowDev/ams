import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

// Create a new store instance.
const store = createStore({

    state() {
        return {
            userLoggedIn: false,//default false
            userCredentials: {
                id: 0,
                email: "",
                userName: "",
            },
            login_token: "",
            userRole: "Super-admin",
        }
    },
    mutations: {
        login(state, userCredentials) {
            state.userCredentials = userCredentials;
            state.userLoggedIn = true;
        },
        logout(state) {
            state.userLoggedIn = false;
            state.userCredentials = null;
        },
        token_set(state, login_token) {
            state.login_token = login_token;
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
            return state.userCredentials.userName;
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