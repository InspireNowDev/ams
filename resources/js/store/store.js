import { createStore } from 'vuex'


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
            userRole: "Super-admin",
        }
    },
    mutations: {
        increment(state) {

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
            return state.userCredentials.userRole;
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
    }

})

export default store;