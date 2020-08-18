module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true
    })

    //增
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //查
    router.get('/',async (req, res) => {
        let queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(200)
        res.send(items)
    })
    // 查找单个
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 查找单个并更新
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //根据id删除
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    //中间件
    const authMiddleware = require('../../middleware/auth')
    const resouerceMiddleware = require('../../middleware/resource')

    //通用CURD接口
    app.use('/admin/api/rest/:resource',authMiddleware(),resouerceMiddleware(), router)
    //上传图片接口
    const multer = require('multer')
    //将图片上传到哪--中间键
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(),upload.single('file'), async (req, res) => {
        const file = req.file
        //设置图片url属性,用于管理页面显示
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    //登录请求接口
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        //1.根据请求数据来找用户
        const user = await AdminUser.findOne({ username }).select('+password')//'+'强制选择取出
        assert(user, 422, '用户不存在')
        //2.密码验证
        const isValid = require('bcryptjs').compareSync(password,user.password)
        assert(isValid,422,'密码错误')
        //3.返回token
        const token = jwt.sign({id:user._id},app.get('secret'))
        res.send({token})
    })

    //错误处理函数
    app.use(async(err,req,res,next)=>{
        res.status(err.statusCode||500).send({
            message:err.message
        })
    })
}