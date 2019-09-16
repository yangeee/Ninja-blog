const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String }
})

module.exports = mongoose.model('Item', schema) //命名一个表头，以及它存储的数据字段
