import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { ElLoading } from 'element-plus'
// import { LoadingOptionsResolved } from 'element-plus/es/components/loading/src/types'

const SHOW_LOADING = true
// 拦截器设置
interface MyRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptors?: (config: T) => T
  responseInterceptorCatch?: (err: any) => any
}
interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors<T>
  showloading?: boolean
}
//请求类封装
class MyRequest {
  //保存实例化信息
  instance: AxiosInstance
  interceptors?: MyRequestInterceptors
  loading?: any
  showLoading: boolean
  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showloading ?? SHOW_LOADING
    //使用拦截器
    //  封装请求实例化时配置拦的请求截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    //  封装请求实例化时配置的响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    //全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //全局请求成功拦截器
        //1.全局的loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        //全局响应成功拦截器
        //1.关掉loading
        this.loading?.close()
        return res.data
      },
      (err) => {
        //1.关掉loading
        this.loading?.close()
        return err
      }
    )
  }
  //封装请求时的单个拦截器
  request<T>(config: MyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //1.单个请求处理
      if (config.interceptors?.requestInterceptor) {
        //如果请求有请求拦截器
        config = config.interceptors.requestInterceptor(config)
      }

      //2.判断是否要显示loading
      if (config.showloading === false) {
        this.showLoading = false
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            //如果请求有响应拦截器
            // 2.将showLoading设置true, 这样不会影响下一个请求
            this.showLoading = SHOW_LOADING
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res)
        })
        .catch((err) => {
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = SHOW_LOADING
          reject(err)
        })
    })
  }
  get<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default MyRequest
