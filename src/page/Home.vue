<template>
  <div>
    home
  </div>
</template>

<script setup>
import { useStore } from '../store/index.js'
const store = useStore()
const { updateTabs } = store
updateTabs('首页', '/home')
</script>
