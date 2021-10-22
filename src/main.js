import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import db from './plugins/db'

Vue.config.productionTip = false
Vue.prototype.$db = db

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
