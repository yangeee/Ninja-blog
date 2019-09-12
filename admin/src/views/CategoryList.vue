<template>
  <div class="list">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="名称" width="250"></el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  name: 'CategoryList',
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('categories')
      console.log(res)
      this.items = res.data
    }
  },
  created() {
    this.fetch()
  }
}
</script>


<style scoped>
</style>
