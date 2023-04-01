import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://xxx.xxxx/api',
  timeout: 5000
})

export function get(url, params) {
  return instance.get(url, { params })
}

export function post(url, data) {
  return instance.post(url, data)
}

export default instance
