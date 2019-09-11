import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from './plugins/http' //封装axios
Vue.prototype.$http = http //挂载

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
