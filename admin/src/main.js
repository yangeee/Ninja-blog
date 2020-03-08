import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './style.css'

Vue.config.productionTip = false

import http from './plugins/http' //封装axios
Vue.prototype.$http = http //挂载

Vue.mixin({
  computed: {
    mixin_getUploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    mixin_getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
