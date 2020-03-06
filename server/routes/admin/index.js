module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')
  const router = express.Router({
    mergeParams: true
  }) //router代表/admin/api/rest/:resource

  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body) //调用数据库的表头create方法创建数据
    res.send(model)
  })
  // 修改资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  // 资源列表
  router.get(
    '/',
    async (req, res, next) => {
      //请求头后端要用小写开头，会自动对应
      const token = String(req.headers.authorization || '')
        .split(' ')
        .pop()
      assert(token, 401, '登录错误，请重新登录')
      const { id } = jwt.verify(token, app.get('secret'))
      assert(id, 401, '登录错误，请重新登录')
      //必须挂载在req、res才能给下一个函数使用
      req.user = await AdminUser.findById(id)
      assert(req.user, 401, '请先登录')
      await next()
    },
    async (req, res) => {
      const queryOptions = {}
      if (req.Model.modelName === 'Category') {
        queryOptions.populate = 'parent'
      }
      const items = await req.Model.find()
        .setOptions(queryOptions)
        .limit() //调用数据库的表头create方法创建数据
      res.send(items)
    }
  )
  // 资源详情（已登录）
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //图片上传接口
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '../../../uploads'
  })
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

  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    //根据用户名找用户
    const User = await AdminUser.findOne({
      username
    }).select('+password')
    assert(User, 422, '用户不存在')
    //校验密码
    const isValid = require('bcrypt').compareSync(password, User.password)
    assert(isValid, 422, '密码错误')
    //返回token
    const token = jwt.sign(
      {
        id: User._id
      },
      app.get('secret')
    )
    res.send({
      token,
      username: User.username
    })
  })

  // 错误处理函数
  app.use(async (err, req, res, next)=>{
    console.log(err.status)
    res.status(err.status || 500).send({
      message: err.message
    })
  })
}
