import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import news from './components/news'
import account from './components/account'
import login from './components/login'
import administration from './components/administration'


Vue.use(VueRouter)

export default new VueRouter ({
    routes:[
        {
            path: '',
            component: Home,
            name: 'home'
        },
        {
            path: '/news',
            component: news,
            name: 'news'
        },
        {
            path: '/account/:id',
            component: account,
            name: 'account'
        },
        {
            path: '/login',
            component: login,
            name: 'login'
        },
        {
            path: '/administration',
            component: administration,
            name: 'administration'
        }


    ],
     mode: 'history'

})
