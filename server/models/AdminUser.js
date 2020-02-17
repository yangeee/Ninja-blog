const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model('AdminUser', schema) //命名一个表头，以及它存储的数据字段
