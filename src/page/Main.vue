<template>
  <component :is="subMenu.comp" v-for="subMenu in subMenus.filter(sub => sub.is_open)" :key="subMenu.des" v-show="subMenu.is_show"/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store/index.js'
const store = useStore()
const { subMenus } = storeToRefs(store)
</script>

<style lang="scss" scoped>
</style>
