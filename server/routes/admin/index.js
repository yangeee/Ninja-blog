module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../model/Category')
  app.use('/admin/api', router) //使用 express.Router类来让每一个请求前面自动加上这个路径

  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body) //调用数据库的表头create方法创建数据
    res.send(model)
  })
  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.delete('/categories/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  router.get('/categories', async (req, res) => {
    const items = await Category.find().limit() //调用数据库的表头create方法创建数据
    res.send(items)
  })
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })
}
