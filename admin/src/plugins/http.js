import axios from 'axios'
import Vue from 'vue'
import router from '../router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})
//拦截请求，加一个请求头附带token给后端
http.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
//拦截响应，根据message来提示用户错误的原因
http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response.data.message) {
      // 当有多个接口报错时，防止弹出多个框
      Vue.prototype.$message.closeAll()
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
      })
    }
    if (err.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)
export default http
