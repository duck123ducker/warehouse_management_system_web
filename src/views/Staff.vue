<template>
  <div v-loading="isLoading" style="display: flex; align-items: center; flex-direction: column; margin: 10px 10px 0; position: relative;">
    <el-table :data="allUsers" stripe border style="width: 100%; margin-bottom: 10px;">
      <el-table-column align="center" prop="id" label="账号"/>
      <el-table-column align="center" prop="nick_name" label="名称"/>
      <el-table-column align="center" prop="role" label="权限"/>
      <el-table-column align="center" fixed="right" label="操作">
        <template #default="scope">
          <el-button
              link
              type="primary"
              size="small"
              @click.prevent="edit(scope.$index, 'modifyInfo')"
          >
            修改信息
          </el-button>
          <el-button
              link
              type="primary"
              size="small"
              @click.prevent="edit(scope.$index, 'modifyPasswd')"
          >
            修改密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        layout="prev, pager, next, jumper"
        :total="totalStatic.user_num"
        :page-size="20"
        v-model:current-page="currentPage"
        :background="true"
    />
    <div v-if="dialogFormVisible">
      <el-dialog v-model="dialogFormVisible" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false" width="25%">
        <div v-loading="isLoadingDialog">
          <div style="text-align: center; font-weight: 900; margin-bottom: 15px;">
            {{currentMode === 'create'?'新建用户':(currentMode === 'modifyPasswd'?'修改密码':'修改用户信息')}}
          </div>
          <el-form ref="form" :model="tempUser.info" :rules="rules">
            <el-form-item label="账号" prop="id">
              <el-input :disabled="currentMode !== 'create'" v-model="tempUser.info.id"/>
            </el-form-item>
            <div v-if="currentMode !== 'modifyPasswd'">
              <el-form-item label="名称" prop="nick_name">
                <el-input v-model="tempUser.info.nick_name"/>
              </el-form-item>
            </div>
            <div v-if="(currentMode === 'create') || (currentMode === 'modifyPasswd')">
              <el-form-item label="密码" prop="passwd">
                <el-input type="password" v-model="tempUser.info.passwd"/>
              </el-form-item>
            </div>
            <div v-if="currentMode !== 'modifyPasswd'">
              <el-form-item label="权限" prop="role">
                <el-select v-model="tempUser.info.role" placeholder="请选择">
                  <el-option
                      v-for="item in ['none', 'read', 'write', 'create']"
                      :key="item"
                      :label="item"
                      :value="item"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-form>
          <div style="display: flex; justify-content: space-between;">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submit">
              确定
            </el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <div style="position: absolute; left: 5px; top: 11px; display: flex;">
      <Plus @click="edit(-1, 'create')" class="my-icon"/>
      <Refresh style="color: #505050; margin-left: 5px;" @click="pageChange" class="my-icon"/>
    </div>
  </div>
</template>

<script setup>
import request from '../utils/request.js'
import { ref, watch } from 'vue'
import { useStore } from '../store/index.js'
import { storeToRefs } from 'pinia'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import md5 from 'js-md5'

const isLoading = ref(true)
const form = ref(null)
const dialogFormVisible = ref(false)
const isLoadingDialog = ref(false)
const store = useStore()
const { totalStatic } = storeToRefs(store)
const currentPage = ref(1)
const allUsers = ref([])
const tempUser = ref({
  info: {
    id: '',
    nick_name: '',
    role: '',
    passwd: ''
  },
  index: null
})
const validateId = (rule, value, callback) => {
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    callback(new Error('账号只能包含数字、字母与下划线'))
  }else {
    callback()
  }
}
const validateName = (rule, value, callback) => {
  if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
    callback(new Error('账号只能包含数字、字母、中文与下划线'))
  }else {
    callback()
  }
}
const rules = ref({
  id: [
    { required: true, message: '必须填写账号', trigger: 'blur' },
    { min: 5, max: 20, message: '长度在5到20个字符之内', trigger: 'blur' },
    { validator: validateId, trigger: 'blur' }
  ],
  nick_name: [
    { required: true, message: '必须填写名称', trigger: 'blur' },
    { min: 5, max: 20, message: '长度在5到20个字符之内', trigger: 'blur' },
    { validator: validateName, trigger: 'blur' }
  ],
  role: [
    { required: true, message: '必须选择一项角色', trigger: 'blur' }
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
      const params = Object.fromEntries(Object.entries(tempUser.value.info).filter(([_, value]) => value !== ''))
      if(Object.hasOwnProperty.call(params, 'passwd')) params.passwd = md5(params.passwd + 'duckDucker')
      console.log(params)
      request.post('/modify_user', params).then(res => {
        if(res.data === 'success') {
          delete params.passwd
          if(currentMode.value === 'create') {
            allUsers.value.unshift(params)
            if(allUsers.value.length > 20) allUsers.value.pop()
          }else Object.assign(allUsers.value[tempUser.value.index], params)
          isLoadingDialog.value = false
          dialogFormVisible.value = false
          ElMessage.success('修改成功！')
        }
      })
    }else {
      ElMessage.error('请正确填写信息！')
    }
  })
}
const currentMode = ref('')
function edit(index, mode) {
  tempUser.value = {
    info: {
      id: '',
      nick_name: '',
      role: '',
      passwd: ''
    },
    index: null
  }
  switch(mode) {
  case 'modifyInfo':
    tempUser.value.info = JSON.parse(JSON.stringify(allUsers.value[index]))
    break
  case 'modifyPasswd':
    tempUser.value.info.id = allUsers.value[index].id
    break
  }
  tempUser.value.index = index
  currentMode.value = mode
  dialogFormVisible.value = true
}
watch(currentPage, () => {
  pageChange()
}, { immediate: true })
function pageChange() {
  isLoading.value = true
  request.get('/all_user', {
    params: {
      page: currentPage.value
    }
  }).then(res => {
    allUsers.value = res.data
    isLoading.value = false
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-table__header),:deep(.el-table__body){
  width: auto!important;
}
.my-icon {
  color: black;
  height: 16px;
  width: 16px;
  z-index: 2000;
  &:hover {
    cursor: pointer;
  }
}
</style>
