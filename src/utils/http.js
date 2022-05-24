// 封装axios
// 实例化 请求/响应拦截器
import axios from 'axios'
import { history } from './history'
import { getToken, removeToken } from './token'

const http = axios.create({
  baseURL: 'http://127.0.0.1:8081',
  timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use(config => {
  const token = getToken()
  // console.log("token", token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.request.use(response => {
  // 2xx 范围内的状态码都会触发该函数
  // do sth.
  return response
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数
  // 当后端返回401时，说明token已超时，此时跳转回登录页
  if (error.response.status === 401) {
    removeToken()
    history.push('/login')
  }
  return Promise.reject(error)
})

export { http }