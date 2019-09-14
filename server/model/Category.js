const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

module.exports = mongoose.model('Category', schema) //命名一个表头，以及它存储的数据字段
