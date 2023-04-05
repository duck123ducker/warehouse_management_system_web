import axios from 'axios'
import { useStore } from '../store/index.js'
import { ElMessage } from 'element-plus'

const req = axios.create({
  baseURL: 'https://xxx.xxx/api',
  timeout: 5000
})
req.interceptors.request.use(
  config => {
    const store = useStore()
    config.headers.Authorization = 'Bearer ' + store.token
    return config
  }
)
req.interceptors.response.use(
  response => {
    if(response.data === 'expired') {
      ElMessage.error('登录已过期，请重新登录！')
      const store = useStore()
      store.login = true
    }
    return response
  }
)
export default req
