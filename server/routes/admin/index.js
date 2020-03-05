module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  }) //router代表/admin/api/rest/:resource

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body) //调用数据库的表头create方法创建数据
    res.send(model)
  })
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find()
      .setOptions(queryOptions)
      .limit() //调用数据库的表头create方法创建数据
    res.send(items)
  })
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //图片上传接口
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '../../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  //封装通用接口
  app.use(
    '/admin/api/rest/:resource', //api的url命名
    async (req, res, next) => {
      const modelName = require('inflection').classify(req.params.resource) //将路径名变成首字母大写的数据库字段格式
      req.Model = require(`../../models/${modelName}`)
      next()
    }, //从请求中得到所请求的资源种类名，自动添加到
    router
  ) //再使用 express.Router类来让每一个请求前面自动加上这个路径

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    //根据用户名找用户
    const AdminUser = require('../../models/AdminUser')
    const User = await AdminUser.findOne({ username }).select('+password')
    if (!User) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }
    //校验密码
    const isValid = require('bcrypt').compareSync(password, User.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
    //返回token
    const jwt = require('jsonwebtoken')
    const token  = jwt.sign({ id: User._id}, app.get('secret'))
    res.send({
      token,
      username: User.username
    })
  })
}
