import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import resource from 'vue-resource'


Vue.use(Vuex)
Vue.use(resource)

export default new Vuex.Store({
    modules: {
        user, resource
    },
    state:{
        loading:false,
        error:null,
        message:null
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        setMessage (){
            state.message = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    getters: {
        getLoading(state) {
            return state.loading
        },
        getError (state) {
            return state.error
        },
        getMessage (state) {
            return state.error
        }

    },
    actions: {
        loadind({commit}, payload){
                commit('setLoading', payload)
                },
        setError ({commit}, payload) {
            commit('setError', payload)
        },
        setMessage ({commit}, payload) {
            commit('setMessage', payload)
        },
        clearError ({commit}) {
            commit('clearError')
        }

    }
})
