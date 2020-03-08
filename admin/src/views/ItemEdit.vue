<template>
  <div class="ItemEdit">
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="items-uploader"
          :action="mixin_getUploadUrl"
          :headers="mixin_getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="items" />
          <i v-else class="el-icon-plus items-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: 'ItemEdit',
  props: {
    id: {}
  },
  data() {
    return {
      model: {
      },
    }
  },
  created() {
    this.id && this.fetch()//有id就拉取数据进行编辑
  },

  methods: {
    afterUpload(res) {
      this.$set(this.model, 'icon', res.url)
    },
    //保存分类
    async save() {
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/items', this.model)
      }
      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    },
  },

}
</script>


<style>
</style>
