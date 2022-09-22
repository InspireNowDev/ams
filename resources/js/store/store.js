import { createStore } from 'vuex'


// Create a new store instance.
const store = createStore({
    state() {
        return {
            userLoggedIn: false,
            userCredentials: {
                id: 0,
                email: "",
                name: "",
            },
            login_token: "",
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

export default store;