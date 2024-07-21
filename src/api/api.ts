import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import http from './http'

export function apiGetIp6FromIpify() {
  return http.request({
    url: 'https://api6.ipify.org',
    method: 'get',
    params: {
      format: 'json'
    }
  })
}

export function apiGetIpFromIpapi() {
  return http.request({
    url: 'https://ipapi.co/json/',
    method: 'get'
  })
}

export function apiGetIpFromIpify() {
  return http.request({
    url: 'https://api.ipify.org',
    method: 'get',
    params: {
      format: 'json'
    }
  })
}

export function apiGetIpFromIpecho(): Promise<AxiosResponse<string>> {
  return http.request({
    url: 'https://ipecho.net/plain',
    method: 'get'
  })
}

export function apiGetInfoFromHostipByIp(params: any) {
  return http.request({
    url: 'https://ipecho.net/plain',
    method: 'get',
    params
  })
}

// // https://ipinfo.io/ip
// https://ipinfo.io/widget/demo/36.5.185.185
