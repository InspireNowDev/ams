import { createStore } from 'vuex'


// Create a new store instance.
const store = createStore({
    state() {
        return {
            userName: '',
            screenMode: 'dark-mode',//by default
            count: 0,
            profiles: {
                profile: []
            },
            userLoggedIn: false,
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

export default store;