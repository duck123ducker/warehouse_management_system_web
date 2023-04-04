<template>
  <div v-if="login">
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
import { reactive, ref } from 'vue'
import { useStore } from '../store/index.js'
import { storeToRefs } from 'pinia'
import request from '../utils/request.js'
import { ElMessage } from 'element-plus'
import md5 from 'js-md5'

const form = ref(null)
const store = useStore()
const { login, token } = storeToRefs(store)
const isLoadingDialog = ref(false)
const user = ref({
  id: 'admin',
  passwd: ''
})
const rules = reactive({
  id: [
    { required: true, message: '请输入ID', trigger: 'blur' }
  ],
  passwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 32, message: '长度在5到32个字符之内', trigger: 'blur' }
  ]
})
function submit() {
  form.value.validate((valid) => {
    if(valid) {
      isLoadingDialog.value = true
      console.log(Object.assign({}, user.value, { passwd: md5(user.value.passwd + 'duckDucker') }))
      request.post('/login', Object.assign({}, user.value, { passwd: md5(user.value.passwd + 'duckDucker') })).then(res => {
        if(res.data.code === 200) {
          localStorage.setItem('token', res.data.data.token)
          token.value = res.data.data.token
          login.value = false
          ElMessage.success(res.data.message)
        }else {
          isLoadingDialog.value = false
          ElMessage.error(res.data.message)
        }
      })
    }else {
      ElMessage.error('请正确填写信息！')
    }
  })
}
</script>

<style lang="scss" scoped>
</style>
