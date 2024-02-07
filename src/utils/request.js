import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000

})
// sucess 1 fail 2
service.interceptors.request.use((config) => {
  //  inject token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer${store.getters.token}`
  }

  return config
}, (error) => {
  // ex promise
  return Promise.reject(error)
})
// response
service.interceptors.response.use((response) => {
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message({ type: 'error', message: message })
    return process.reject(new Error(message))
  }
}, (error) => {
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})

export default service