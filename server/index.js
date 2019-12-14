const express = require('express')

const app = new express()

app.use(require('cors')()) //允许跨域
app.use(express.json()) //对前端传过来的数据进行json解析
app.use('/uploads', express.static(__dirname + '/uploads')) //托管静态路由

require('./routes/admin')(app) //使用服务端的路由来进行请求的分发
require('./plugins/db')(app) //连接数据库

app.listen(3000, () => {
  console.log('listen http://localhost:3000')
})
