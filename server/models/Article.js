const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }]
})

module.exports = mongoose.model('Article', schema) //命名一个表头，以及它存储的数据字段
