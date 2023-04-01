<template>
  <div v-loading="isLoading" style="display: flex; align-items: center; flex-direction: column;">
    <el-table :data="tableData" stripe style="width: 100%; margin-bottom: 10px;">
      <el-table-column prop="id" label="编码"/>
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="num" label="库存" />
      <el-table-column fixed="right" label="操作">
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
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store/index.js'
import { ref, watch } from 'vue'
import request from '../utils/request.js'

const isLoading = ref(true)
const store = useStore()
const { totalStatic } = storeToRefs(store)
const currentPage = ref(1)
const tableData = ref([])
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
  alert(index)
}
</script>

<style lang="scss" scoped>
:deep(.el-table__header),:deep(.el-table__body) {
  width: auto!important;
}
:deep(.el-table .el-table__cell) {
  padding: 7px 0;
}
</style>
