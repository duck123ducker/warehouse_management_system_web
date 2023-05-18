<template>
  <div>
    <div class="nav-bar-container">
      <i :class="['icon-menu-hamburger', 'iconfont', {rotate: isAsideCollapse}]" @click="collapse()"/>
      <div class="header-right">
        <div @click="logout" class="exit-button">
          <i class="icon-guanji iconfont"/>
          <div class="text">
            退出
          </div>
        </div>
      </div>
    </div>
    <div class="tags-container">
      <div v-for="subMenu in subMenus.filter(sub => sub.is_open)" :key="subMenu.des" @click="goPage(subMenu.des)" :class="['tag-container', {isShow: subMenu.is_show}]">
        <div class="dot"/>
        {{ subMenu.des }}
        <Close @click.stop="closePage(subMenu.des)" style="margin-left: 3px ;height: 16px; width: 16px;"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store/index.js'
import { Close } from '@element-plus/icons-vue'
const store = useStore()
const { isAsideCollapse, subMenus } = storeToRefs(store)
const { collapse, goPage, closePage } = store
function logout() {
  localStorage.removeItem('token')
  location.reload()
}
</script>

<style lang="scss" scoped>
.nav-bar-container {
  height: 50px;
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
  .tag-container {
    margin-left: 15px;
    height: 30px;
    width: fit-content;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 0 5px 0 10px;
    border-radius: 5px;
    border: 1px #d5d5d5 solid;
    &:hover {
      cursor: pointer;
    }
    &.isShow {
      background: #09f;
      color: white;
      border: none;
      .dot {
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 5px;
        margin-right: 3px;
      }
    }
  }
}
</style>
