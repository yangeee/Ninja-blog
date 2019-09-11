module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../model/Category')
  app.use('/admin/api', router) //使用 express.Router类来让每一个请求前面自动加上这个路径

  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
}
