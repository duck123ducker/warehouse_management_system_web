<template>
  <div>
    <el-table :data="tableData" style="width: 100%" height="250">
      <el-table-column prop="name" label="名字" />
      <el-table-column prop="auth" label="权限" />
      <el-table-column prop="position" label="职位" />
    </el-table>
  </div>
</template>

<script setup>
const tableData = [
  {
    name: '张三',
    auth: '普通',
    position: '员工'
  },
  {
    name: '张三',
    auth: '普通',
    position: '员工'
  },
  {
    name: '张三',
    auth: '普通',
    position: '员工'
  },
  {
    name: '张三',
    auth: '普通',
    position: '员工'
  },
  {
    name: '张三',
    auth: '普通',
    position: '员工'
  }
]
</script>

<style lang="scss" scoped>
:deep(.el-table__header),:deep(.el-table__body){
  width: auto!important;
}
</style>
