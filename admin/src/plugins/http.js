import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

//拦截响应，，根据message来提示用户错误的原因
http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    return Promise.reject(err)
  }
)
export default http
