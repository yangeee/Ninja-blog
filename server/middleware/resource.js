module.exports = options =>{
    return async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource) //将路径名变成首字母大写的数据库字段格式
        req.Model = require(`../models/${modelName}`)
        next()
      }//从请求中得到所请求的资源种类名，自动添加到后缀
}