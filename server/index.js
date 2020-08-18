const express = require('express')

const app = express()
//跨域
app.use(require('cors')())
//处理req.body的中间件
app.use(express.json())
//开放静态资源
app.use('/uploads', express.static(__dirname + '/uploads'))

//token变量
app.set('secret','HalleluYah')

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
    console.log('服务器启动完成，端口号：3000')
})