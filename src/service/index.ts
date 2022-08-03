import MyRequest from './request/request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const request = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      //请求成功拦截
      //携带token拦截
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      //请求失败拦截
      return err
    },
    responseInterceptors: (config) => {
      //response成功拦截
      return config
    },
    responseInterceptorCatch: (err) => {
      // 响应失败拦截器
      return err
    }
  }
})
export default request
