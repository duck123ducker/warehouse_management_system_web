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
        <router-view/>
      </div>
    </div>
    <el-dialog v-model="login" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false" width="25%">
      <div v-loading="isLoadingDialog">
        <div style="text-align: center; font-weight: 900; margin-bottom: 15px;">
          登录
        </div>
        <el-form ref="form" label-width="auto" :model="user" :rules="rules">
          <el-form-item label="用户名" prop="id">
            <el-input disabled v-model="user.id"/>
          </el-form-item>
          <el-form-item label="密码" prop="passwd">
            <el-input type="password" v-model="user.passwd"/>
          </el-form-item>
        </el-form>
        <div style="text-align: center;">
          <el-button type="primary" @click="submit">
            确定
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import { reactive, ref } from 'vue'
import { useStore } from './store/index.js'
import { storeToRefs } from 'pinia'
import request from './utils/request.js'
import { ElMessage } from 'element-plus'
import md5 from 'js-md5'

const form = ref(null)
const store = useStore()
const { login } = storeToRefs(store)
const isLoadingDialog = ref(false)
const user = {
  id: 'admin',
  passwd: ''
}
const rules = reactive({
  id: [
    { required: true, message: '请输入ID', trigger: 'blur' }
  ],
  passwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 32, message: '长度在6到32个字符之内', trigger: 'blur' }
  ]
})
function submit() {
  form.value.validate((valid) => {
    if(valid) {
      isLoadingDialog.value = true
      request.post('/login', Object.assign({}, user, { passwd: md5(user.passwd + 'duckDucker') })).then(res => {
        if(res.data.code === '200') {
          localStorage.setItem('token', res.data.token)
          ElMessage.success('登录成功！')
        }
      })
    }else {
      ElMessage.error('请正确填写信息！')
    }
  })
}
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
