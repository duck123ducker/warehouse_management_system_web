import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import './assets/iconfont.css'
import 'element-plus/dist/index.css'
import 'default-passive-events'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.mount('#app')
