import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
  const isAsideCollapse = ref(false)
  function collapse() {
    isAsideCollapse.value = !isAsideCollapse.value
  }
  const tabs = ref([])
  function updateTabs(name, path) {
    if (!tabs.value.find(item => item === name)) {
      tabs.value.push({ name: name, path: path })
    }
  }
  return { isAsideCollapse, collapse, tabs, updateTabs }
})
