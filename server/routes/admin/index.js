module.exports = app => {
  const express = require('express')
  const fs = require('fs')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')
  const multer = require('multer')
  const ffmpeg = require('fluent-ffmpeg')
  const cryptoRandomString = require('crypto-random-string')

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
  // 资源详情（已登录）
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //视频上传接口
  var videoStorage = multer.diskStorage({
    destination: __dirname + '../../../videos',
    filename: function(req, file, cb) {
      cb(null, 'input.mp4')
    }
  })
  const uploadVideo = multer({
    storage: videoStorage
  })

  app.post('/admin/api/video', uploadVideo.single('file'), async (req, res) => {
    const file = req.file
    var cryptoString = cryptoRandomString({ length: 10, type: 'base64' })
    var houzhui = file.filename.substr(file.filename.indexOf('.'))
    ffmpeg(file.path)
      .on('start', commandLine => {
        console.log('执行命令: ' + commandLine)
      })
      .on('progress', progress => {
        console.log('进度' + progress.percent + '% done')
      })
      .on('end', () => {
        console.log('完成')
      })
      .noAudio()
      .save(`./videos/${cryptoString}${houzhui}`)
    file.url = `http://localhost:3000/videos/${cryptoString}${houzhui}`
    res.send(file)
  })

  //音频上传接口
  var audioStorage = multer.diskStorage({
    destination: __dirname + '../../../audios',
  })
  const uploadAudio = multer({
    storage: audioStorage
  })
  app.post('/admin/api/audio', uploadAudio.single('file'), async (req, res) => {
    const file = req.file
    // var cryptoString = cryptoRandomString({ length: 10, type: 'base64' })
    var houzhui = file.originalname.substr(file.originalname.indexOf('.'))
    fs.renameSync(file.path, `${file.path}${houzhui}`)
    file.url = `http://localhost:3000/audios/${file.filename}${houzhui}`
    res.send(file)
  })
  //图片上传接口
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
    '/admin/api/rest/:resource', //动态路径参数,存入req.params.resource
    authMiddleware(),
    resourceMiddleware(),
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
  app.use(async (err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message
    })
  })
}
