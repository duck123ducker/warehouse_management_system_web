<template>
  <div>
    {{totalStatic}}
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store/index.js'
import request from '../utils/request.js'
const store = useStore()
const { totalStatic } = storeToRefs(store)

request.get('/static').then(res => { totalStatic.value = res.data })
</script>
