<template>
  <div class="header_">
    <i :class="['icon-menu-hamburger', 'iconfont', {rotate: isAsideCollapse}]" @click="collapse()"/>
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
.header_ {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px #e5e5e5 solid;
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
</style>
