const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  title: { type: String },
  categories: [{type: mongoose.SchemaTypes.ObjectId,ref:'Category'}],
  scores:{
    difficult: {type: Number},
    skill: {type: Number},
    description: {type: Number},
    survive: {type: Number},
    attack: {type: Number}

  },
  skills:[{
    icon:{type:String},
    nme:{type:String},
    description:{type:String},
    tips:{type:String},
  }],
  items1: [{type: mongoose.SchemaTypes.ObjectId, ref:'Item'}],
  items2: [{type: mongoose.SchemaTypes.ObjectId, ref:'Item'}],
  usageTips: {type: String},
  battleTips: {type: String},
  teamTips: {type: String},
  partners: [{
    hero: {type: mongoose.SchemaTypes.ObjectId,ref:'Hero'},
    description: {type: String}
  }],
})

module.exports = mongoose.model('Hero', schema) //命名一个表头，以及它存储的数据字段
