import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './style.css'

Vue.config.productionTip = false

import http from './plugins/http' //封装axios
Vue.prototype.$http = http //挂载

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    change_username(state,username){
      state.username = username
    }
  }
})

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
  store,
  render: h => h(App)
}).$mount('#app')
