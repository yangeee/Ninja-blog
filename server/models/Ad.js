const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  items: [
    {
      image: { type: String },
      url: { type: String }
    }
  ]
})

module.exports = mongoose.model('Ad', schema) //命名一个表头，以及它存储的数据字段
