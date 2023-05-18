<template>
  <div class="app">
    <div class="col-1">
      <Aside/>
    </div>
    <div class="col-2">
      <div class="header">
        <Header/>
      </div>
      <div v-if="!login" class="main">
        <Main/>
      </div>
    </div>
    <login/>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import Login from './views/login.vue'
import { useStore } from './store/index.js'
import { storeToRefs } from 'pinia'
import { provide } from 'vue'

import * as echarts from 'echarts'
import Main from '@/page/Main.vue'
provide('echarts', echarts)
const store = useStore()
const { login } = storeToRefs(store)
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  min-width: 900px;
  padding: 0;
  margin: auto;
  display: flex;
  flex-direction: row;
  .col-1 {
    background: rgb(48, 65, 86);
    height: 100vh;
  }
  .col-2 {
    flex: 1 1;
    .header {
      height: 100px;
    }
    .main {
      height: calc(100vh - 100px);
      overflow: auto;
    }
  }
}
:deep(.el-dialog) {
  min-width: 250px;
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 15px 20px;
  }
}
</style>
