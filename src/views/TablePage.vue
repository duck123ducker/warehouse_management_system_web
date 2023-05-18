<template>
  <div style="display: flex; align-items: center; flex-direction: column;">
    <el-table :data="props.tableData" stripe border style="width: 100%; margin-bottom: 10px;">
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
          <el-button
              link
              type="primary"
              size="small"
              @click.prevent="showAccessLog(scope.$index)"
          >
            操作记录
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        layout="prev, pager, next, jumper"
        :total="props.totalNums"
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
    <el-dialog v-model="accessLogVisible" :close-on-press-escape="false" :show-close="false" width="fit-content">
      <access-log v-if="accessLogVisible" :target="accessLogProps.target" :id="accessLogProps.id"/>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import request from '../utils/request.js'
import { ElMessage } from 'element-plus'
import AccessLog from './accessLog.vue'

const props = defineProps(['tableData', 'totalNums', 'type_', 'refresh'])
const emit = defineEmits(['pageChange', 'tableDataUpdate'])
const form = ref(null)
const isLoadingDialog = ref(false)
const currentPage = ref(1)
const dialogFormVisible = ref(false)
const currentPack = ref({
  index: null,
  info: {}
})
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
function edit(index) {
  currentPack.value.info = JSON.parse(JSON.stringify(props.tableData[index]))
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
          emit('tableDataUpdate', currentPack.value.index, currentPack.value.info)
          dialogFormVisible.value = false
          ElMessage.success('修改成功！')
        }
      })
    }else {
      ElMessage.error('请正确填写信息！')
    }
  })
}
watch(currentPage, () => {
  emit('pageChange', currentPage.value, props.type_)
}, { immediate: true })
watch(() => props.refresh, () => {
  if(props.refresh) {
    emit('pageChange', currentPage.value, props.type_)
  }
})
const accessLogVisible = ref(false)
const accessLogProps = ref({
  target: null,
  id: null
})
function showAccessLog(index) {
  accessLogVisible.value = true
  accessLogProps.value = {
    target: 'pack',
    id: props.tableData[index].id
  }
}
</script>

<style lang="scss" scoped>
</style>
