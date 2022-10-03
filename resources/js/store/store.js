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
                name: "",
            },
            login_token: "",
            userRole: "admin",
        }
    },
    mutations: {
        login(state, userCredentials, loginToken) {
            state.userCredentials = userCredentials;
            state.login_token = loginToken;
            state.userLoggedIn = true;
        },
        logout(state) {
            state.userLoggedIn = false;
            state.login_token = '';
            state.userCredentials = null;
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