import axios from 'axios'
const req = axios.create({
  baseURL: 'https://xxx.xxx/api',
  timeout: 5000
})
export default req
