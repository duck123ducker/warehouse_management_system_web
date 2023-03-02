import { createRouter, createWebHistory } from 'vue-router'
import Main from '../page/Main.vue'
import NotFound from '../page/NotFound.vue'
const routes = [
  { path: '/', component: Main },
  { path: '/:pathMatch(.*)', component: NotFound }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
