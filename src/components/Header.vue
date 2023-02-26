<template>
  <div>
    <div class="nav-bar-container">
      <i :class="['icon-menu-hamburger', 'iconfont', {rotate: isAsideCollapse}]" @click="collapse()"/>
      <div class="header-right">
        <div class="exit-button">
          <i class="icon-guanji iconfont"/>
          <div class="text">
            退出
          </div>
        </div>
      </div>
    </div>
    <div class="tags-container">
      1
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store/index.js'
const store = useStore()
const { isAsideCollapse } = storeToRefs(store)
const { collapse } = store
</script>

<style lang="scss" scoped>
.nav-bar-container {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px #e5e5e5 solid;
  .header-right {
    display: flex;
    align-items: center;
    margin-right: 5px;
    .exit-button {
      display: flex;
      align-items: center;
      padding: 7px 15px;
      border-radius: 5px;
      &:hover {
        background: #e1efff;
        cursor: pointer;
      }
      .text {
        font-size: 14px;
        margin-left: 3px;
      }
    }
  }
  .icon-menu-hamburger {
    font-size: 24px;
    margin-left: 10px;
    &:hover {
      cursor: pointer;
    }
    &.iconfont {
      transition: 0.3s;
      &.rotate {
        transform: rotate(90deg);
      }
    }
  }
}
.tags-container {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px #e5e5e5 solid;
}
</style>
