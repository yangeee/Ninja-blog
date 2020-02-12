<template>
  <div class="ItemEdit">
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="skills">
        <el-tab-pane label="基础信息">
          <el-form-item label="头像">
            <el-upload
              class="items-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="items" />
              <i v-else class="el-icon-plus items-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="难度">
            <el-rate
              style="margin-top:0.7rem;"
              :max="9"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top:0.7rem;" :max="9" show-score v-model="model.scores.skill"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top:0.7rem;" :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top:0.7rem;" :max="9" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>

          <!-- items1表示已经存入的选好的装备，items表示整个装备库 -->
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})">添加技能</el-button>
          
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="items-uploader"
                  :action="$http.defaults.baseURL+'/upload'"
                  :show-file-list="false"
                  :on-success="afterUpload"
                >
                  <img v-if="model.icon" :src="model.icon" class="items" />
                  <i v-else class="el-icon-plus items-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-textarea v-model="model.description"></el-textarea>
              </el-form-item>
              <el-form-item label="描述">
                <el-textarea v-model="model.tips"></el-textarea>
              </el-form-item>
            
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
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
        name: '',
        avatar: '',
        scores: {},
        skills: []
      },
      categories: [],
      items: [],
    }
  },
  created() {
    this.id && this.fetch()//有id就拉取数据进行编辑
    this.fetchCategories()
    this.fetchItems()
  },

  methods: {
    afterUpload(res) {//
      this.model.avatar = res.url
    },
    //保存编辑的内容
    async save() {
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/heroes', this.model)
      }
      this.$router.push('/heroes/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`)
      this.items = res.data
    },
  },

}
</script>


<style>
.items-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.items-uploader .el-upload:hover {
  border-color: #409eff;
}
.items-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.items {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
