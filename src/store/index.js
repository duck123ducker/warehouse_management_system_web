import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { Box, HomeFilled, UserFilled } from '@element-plus/icons-vue'
import Home from '../views/Home.vue'
import Package from '../views/Package.vue'
import Staff from '../views/Staff.vue'

export const useStore = defineStore('store', () => {
  const token = ref(localStorage.getItem('token'))
  const login = ref(false)
  if(!token.value) login.value = true
  const isAsideCollapse = ref(false)
  function collapse() {
    isAsideCollapse.value = !isAsideCollapse.value
  }
  const subMenus = ref([
    { icon: shallowRef(HomeFilled), des: '首页', visible: false, comp: shallowRef(Home), is_show: true, is_open: true },
    { icon: shallowRef(Box), des: '包裹管理', visible: false, comp: shallowRef(Package), is_show: false, is_open: false },
    { icon: shallowRef(UserFilled), des: '员工管理', visible: false, comp: shallowRef(Staff), is_show: false, is_open: false }
  ])
  function goPage(name) {
    const index = subMenus.value.findIndex(subMenu => subMenu.des === name)
    subMenus.value.forEach((subMenu, i) => {
      if(i !== index) subMenu.is_show = false
      else Object.assign(subMenu, { is_show: true, is_open: true })
    })
  }
  function closePage(name) {
    if(subMenus.value.filter(subMenu => subMenu.des !== name).length) {
      const index = subMenus.value.findIndex(subMenu => subMenu.des === name)
      if(subMenus.value[index].is_show) {
        Object.assign(subMenus.value[index], { is_show: false, is_open: false })
        for(let i = subMenus.value.length - 1; i >= 0; i--) {
          if(subMenus.value[i].is_open) {
            subMenus.value[i].is_show = true
            break
          }
        }
      }
      subMenus.value[index].is_open = false
    }
  }
  const totalStatic = ref({})
  return { isAsideCollapse, collapse, subMenus, goPage, closePage, totalStatic, token, login }
})
