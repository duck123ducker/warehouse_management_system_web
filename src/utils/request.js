import axios from 'axios'
import { useStore } from '../store/index.js'
const req = axios.create({
  baseURL: 'https://xxx.xxx/api',
  timeout: 5000
})
req.interceptors.request.use(
  config => {
    const store = useStore()
    config.headers.token = store.token
    return config
  }
)
req.interceptors.response.use(
  response => {
    if(response.data === 'expired') {
      const store = useStore()
      store.login = true
    }
    return response
  }
)
export default req
