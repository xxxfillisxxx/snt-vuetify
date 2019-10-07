import * as resource from 'vue-resource'



export default {
    state: {
        user: null,
        newUserId: null,
        checks:[],
        checksAll:[],
        sections:[],
        sectionsAll:[],
        users:[]
    },
    mutations: {
        setNewUserId (state, payload) {
            state.newUserId = payload
        },
        setUser (state, payload) {
            state.user = payload
            },
        setUsers (state, payload) {
            state.users= payload
        },
        setChecks(state, payload){
            state.checks = payload
        },
        setChecksAll(state, payload){
            state.checksAll = payload
        },
        setSections(state, payload){
            state.sections=payload
        },
        setSectionsAll(state, payload){
            state.sectionsAll=payload
        }
    },
    actions: {
        async auth({commit}, user) {
            commit('clearError')
            commit('setLoading', true)

            try {
                this.dispatch('clearError')
                const responseServer= await resource.Http.post('http://localhost:81/login.php', JSON.stringify(user))
                if(responseServer.data!=='false'){
                const us=new Object

                    us.id = responseServer.data.id
                    us.login = responseServer.data.login
                    us.admin = responseServer.data.admin
                    commit('setUser', us)
                    commit('setChecks', responseServer.data.checks)
                    commit('setChecksAll', responseServer.data.checksAll)
                    commit('setSections', responseServer.data.sections)
                    commit('setSectionsAll', responseServer.data.sectionsAll)
                    commit('setUsers', responseServer.data.users)
                    commit('setLoading', false)


            }
                else if(responseServer.data=='false'){
                    commit('setLoading', false)
                   commit('setError', 'Неверный логин или пароль')


                }
            }

            catch (error) {
                throw error
            }

        },
        async addUser({commit}, user) {
            commit('clearError')
            commit('setLoading', true)

            try {
                this.dispatch('clearError')
                const responseServer= await resource.Http.post('http://localhost:81/admin.php', JSON.stringify(user))
                if(responseServer.data!==false){
                    commit('setLoading', false)
                    commit('setNewUserId', responseServer.data)
                    // console.log(responseServer.data)
                    // console.log(this.state.user.newUserId)
                    commit('setLoading', false)

                }
                else {
                    commit('setLoading', false)
                    commit('setError', responseServer.data)


                }
            }

            catch (error) {
                throw error
            }

        },
        logout({commit}){
            commit('setUser', null)
        }


    },
    getters: {
        user (state){
            return state.user
        },
        getUsers(state){

            return state.users
        },
        getUserName(state){
          return state.user.login
        },
        getUserId(state){
          return state.user.id
        },

        getChecks(state){
            return state.checks
        },
        getSections(state){
            return state.sections
        },
        getSectionsAll(state){
            return state.sectionsAll
        },
        getChecksAll(state){
            return state.checksAll
        },
        getNewUserId(state){
            return state.newUserId
        }
    }
}


