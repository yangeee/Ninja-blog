module.exports = options => {
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')
  const assert = require('http-assert')
  return async (req, res, next) => {
    //请求头后端要用小写开头，会自动对应
    const token = String(req.headers.authorization || '')
      .split(' ')
      .pop()
    assert(token, 401, '登录错误，请重新登录')
    const { id } = jwt.verify(token, res.app.get('secret'))
    assert(id, 401, '登录错误，请重新登录')
    //必须挂载在req、res才能给下一个函数使用
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
  }
}
