<template>
  <div class="app">
    <div class="col-1">
      <Aside/>
    </div>
    <div class="col-2">
      <div class="header">
        <Header/>
      </div>
      <div class="main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
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
      height: 110px;
    }
    .main {
      height: calc(100vh - 110px);
      overflow: auto;
    }
  }
}
</style>
