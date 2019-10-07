import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import resource from 'vue-resource'
import router from './routes'
import store from './store'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify)
Vue.use(resource)
Vue.use(store)
Vue.config.productionTip = false

export default new Vuetify({ })
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  resource,
  vuetify: new Vuetify(),
  components: { App },
  template: '<App/>'
})
