<template>
  <div v-loading="isLoading">
    <div style="display: flex; align-items: center; flex-direction: column;">
      <el-table :data="tableData" stripe style="width: 100%; margin-bottom: 10px;">
        <el-table-column align="center" prop="id" label="编码"/>
        <el-table-column align="center" prop="name" label="名称"/>
        <el-table-column align="center" prop="num" label="库存" />
        <el-table-column align="center" fixed="right" label="操作">
          <template #default="scope">
            <el-button
                link
                type="primary"
                size="small"
                @click.prevent="edit(scope.$index)"
            >
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          layout="prev, pager, next, jumper"
          :total="totalStatic.total_num"
          :page-size="20"
          v-model:current-page="currentPage"
          :background="true"
      />
    </div>
    <div>
      <el-dialog v-model="dialogFormVisible" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false" width="25%">
        <div v-loading="isLoadingDialog">
          <div style="text-align: center; font-weight: 900; margin-bottom: 15px;">
            修改信息
          </div>
          <el-form ref="form" :model="currentPack.info" :rules="rules">
            <el-form-item label="编码" prop="id">
              <el-input disabled v-model="currentPack.info.id"/>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="currentPack.info.name"/>
            </el-form-item>
            <el-form-item label="库存" prop="num">
              <el-input-number :min="0" v-model.number="currentPack.info.num"/>
            </el-form-item>
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
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store/index.js'
import { reactive, ref, watch } from 'vue'
import request from '../utils/request.js'
import { ElMessage } from 'element-plus'

const form = ref(null)
const dialogFormVisible = ref(false)
const isLoading = ref(true)
const isLoadingDialog = ref(false)
const store = useStore()
const { totalStatic } = storeToRefs(store)
const currentPage = ref(1)
const tableData = ref([])
const currentPack = ref({
  index: null,
  info: {}
})
watch(currentPage, () => {
  isLoading.value = true
  request.get('/all_pack', {
    params: {
      page: currentPage.value
    }
  }).then(res => {
    isLoading.value = false
    tableData.value = res.data
  })
}, { immediate: true })
function edit(index) {
  currentPack.value.info = JSON.parse(JSON.stringify(tableData.value[index]))
  currentPack.value.index = index
  dialogFormVisible.value = true
}
function submit() {
  form.value.validate((valid) => {
    if(valid) {
      isLoadingDialog.value = true
      // eslint-disable-next-line camelcase
      const { access_log, ...formData_ } = currentPack.value.info
      request.post('/modify', formData_).then(res => {
        if(res.data === 'success') {
          isLoadingDialog.value = false
          tableData.value[currentPack.value.index] = currentPack.value.info
          dialogFormVisible.value = false
          ElMessage.success('修改成功！')
        }
      })
    }else {
      ElMessage.error('请正确填写信息！')
    }
  })
}
const rules = reactive({
  id: [
    { required: true, message: '请输入ID', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在2到10个字之内', trigger: 'blur' }
  ],
  num: [
    { required: true, message: '请输入库存', trigger: 'blur' },
    { type: 'number', message: '必须是数字', trigger: 'blur' }
  ]
})
</script>

<style lang="scss" scoped>
:deep(.el-table__header),:deep(.el-table__body) {
  width: auto!important;
}
:deep(.el-table .el-table__cell) {
  padding: 7px 0;
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
:deep(.el-loading-mask) {
  z-index: 9999;
}
</style>
