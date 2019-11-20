import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        isLoggedIn: false
    },
    mutations: {
        // Mutations
        setLoggin: function(state) {
            state.isLoggedIn = true;
        },
        setLogout: function(state) {
            state.isLoggedIn = false;
        }
    }
});
export default store;