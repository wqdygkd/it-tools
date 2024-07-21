import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

class HttpRequest {
  // private readonly baseUrl: string
  private defaults: AxiosRequestConfig
  constructor(options: AxiosRequestConfig) {
    this.defaults = {
      baseURL: '',
      timeout: 80000
    }
    this.defaults = Object.assign(this.defaults, options)
  }

  // 请求拦截
  interceptors(instance: AxiosInstance) {
    instance.interceptors.request.use((config) => {
      return config
    }, (error: any) => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use((res) => {
      const { data } = res
      return data
    }, (error: any) => {
      return Promise.reject(error)
    })
  }

  request(options: AxiosRequestConfig) {
    const instance = axios.create()
    options = Object.assign(this.defaults, options)
    this.interceptors(instance)
    return instance(options)
  }
}

const http = new HttpRequest({})
export default http
