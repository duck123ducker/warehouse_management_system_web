<template>
  <div v-loading="isLoading">
    <div style="margin: 10px;">
      <el-input v-model="inputSearch" placeholder="请输入查询关键词">
        <template #prepend>
          <el-select v-model="select" placeholder="Select" style="width: 115px">
            <el-option label="编码" value="id" />
            <el-option label="名称" value="name" />
          </el-select>
        </template>
        <template #append>
          <el-button @click="search_" :icon="Search"/>
        </template>
      </el-input>
    </div>
    <div style="margin: 10px 10px 0; position: relative;" v-show="!isSearching">
      <table-page :refresh="refresh" :totalNums="allResult.total_num" :table-data="allResult.tableData" type_="all"
                  @pageChange="pageChange" @tableDataUpdate="((index, value)=>{allResult.tableData[index] = value})"
      ></table-page>
      <Refresh @click="refresh = true;" class="my-icon"/>
    </div>
    <div style="margin: 10px 10px 0; position: relative;" v-if="isSearching">
      <table-page :totalNums="searchResult.total_num" :table-data="searchResult.tableData" type_="search"
                  @pageChange="pageChange" @tableDataUpdate="((index, value)=>{searchResult.tableData[index] = value})"
      ></table-page>
      <ArrowLeft @click="refresh = true; isSearching = false; searchResult = {tableData: [], total_num: 0}" class="my-icon"/>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import request from '../utils/request.js'
import { Search, ArrowLeft, Refresh } from '@element-plus/icons-vue'
import TablePage from './TablePage.vue'

const isSearching = ref(false)
const searchField = ref(null)
const searchValue = ref(null)
const searchResult = ref({
  tableData: [],
  total_num: 0
})
const allResult = ref({
  tableData: [],
  total_num: 0
})
const select = ref('id')
const inputSearch = ref('')
const isLoading = ref(true)
const refresh = ref(false)
async function search_() {
  searchField.value = select.value
  searchValue.value = inputSearch.value
  isSearching.value = false
  await nextTick()
  isSearching.value = true
}
function pageChange(newPage, type_) {
  isLoading.value = true
  if(type_ === 'all') {
    request.get('/all_pack', {
      params: {
        page: newPage
      }
    }).then(res => {
      allResult.value = res.data
      isLoading.value = false
      refresh.value = false
    })
  }else if(type_ === 'search') {
    request.get('/search_pack', {
      params: {
        [searchField.value]: searchValue.value,
        page: newPage
      }
    }).then(res => {
      searchResult.value = res.data
      isLoading.value = false
    })
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-table__header),:deep(.el-table__body) {
  width: auto!important;
}
:deep(.el-table .el-table__cell) {
  padding: 7px 0;
}
.my-icon {
  color: #a8abb2;
  height: 16px;
  width: 16px;
  position: absolute;
  left: 5px;
  top: 11px;
  z-index: 2000;
  &:hover {
    cursor: pointer;
  }
}
</style>
