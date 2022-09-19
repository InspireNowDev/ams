import { createStore } from 'vuex'


// Create a new store instance.
const store = createStore({
    state() {
        return {
            screenMode: 'dark-mode',//by default
            count: 0,
            students: ["ali", "abu"],
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

export default store;