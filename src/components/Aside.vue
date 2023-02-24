<template>
  <el-scrollbar :class="['aside', {'is-collapse': isAsideCollapse}]">
    <div :class="['aside_', {'is-collapse_': isAsideCollapse}]">
      <div class="row-1">
        <div class="title">
          <img src="/src/assets/logo.svg" style="width: 30px;">
          <div v-if="!isAsideCollapse" class="text">
            仓储管理系统
          </div>
        </div>
      </div>
      <div class="menu">
        <el-tooltip v-for="(subMenu, index) in subMenus" :key="index" :visible="subMenu.visible" placement="right" :content="subMenu.des" :offset="25">
          <div>
            <div class="row-2" @mouseover="subMenu.visible = !!isAsideCollapse" @mouseleave="subMenu.visible = false">
              <component :is="subMenu.icon" style="height: 16px; width: 16px; color: white;"/>
              <div v-if="!isAsideCollapse" class="text">
                {{subMenu.des}}
              </div>
            </div>
          </div>
        </el-tooltip>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { ref } from 'vue'
import { HomeFilled, Box, UserFilled } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useStore } from '../store/index.js'
const store = useStore()
const { isAsideCollapse } = storeToRefs(store)
const subMenus = ref([
  { icon: HomeFilled, des: '首页', visible: false },
  { icon: Box, des: '包裹管理', visible: false },
  { icon: UserFilled, des: '员工管理', visible: false }
])
</script>

<style lang="scss" scoped>
.aside {
  color: white;
  width: 200px;
  transition: 0.3s;
  .aside_ {
    left: 0;
    width: 200px;
    padding-top: 15px;
    .row-1 {
      width: 100%;
      padding-bottom: 20px;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0s;
        .text {
          margin-left: 5px;
          font-weight: 900;
          font-size: 18px;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .menu {
      .row-2 {
        display: flex;
        height: 56px;
        width: 100%;
        align-items: center;
        padding-left: 20px;
        transition: background 0.3s ease;
        &:hover {
          background: rgb(38 45 55);
          cursor: pointer;
        }
        .text {
          overflow: hidden;
          white-space: nowrap;
          margin-left: 20px;
          font-size: 16px;
        }
      }
    }
    &.is-collapse_ {
      width: 50px;
      padding: 15px 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .row-2 {
        padding: 0;
      }
    }
  }
  &.is-collapse {
    width: 50px;
  }
}
</style>
