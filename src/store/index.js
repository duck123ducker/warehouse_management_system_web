import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
  const isAsideCollapse = ref(false)
  function collapse() {
    isAsideCollapse.value = !isAsideCollapse.value
  }
  return { isAsideCollapse, collapse }
})
