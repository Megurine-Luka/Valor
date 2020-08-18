module.exports = options =>{
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    const assert = require('http-assert')

    return async(req,res,next)=>{
        //从请求中获取token
        const token = String(req.headers.authorization||'').split(' ').pop()
        assert(token,401,'请先登录')
        //从token中获得用户id
        const {id} = jwt.verify(token,req.app.get('secret'))
        assert(token,401,'请先登录')
        //从数据库中找id对应的用户
        req.user = await AdminUser.findById(id)
        assert(token,401,'请先登录')
        await next()
    } 
}