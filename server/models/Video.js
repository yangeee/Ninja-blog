const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  video: { type: String }
})

module.exports = mongoose.model('Video', schema) //命名一个表头，以及它存储的数据字段
