module.exports = options => {
    return async (req, res, next) => {
        //从请求接口中获得需要的模型名（如categories），然后将其转换为模型名(Category)
        const modelName = require('inflection').classify(req.params.resource)
        //按要求加载模型，并挂载到req上，以便使用
        req.Model = require(`../models/${modelName}`)
        next()
    }
}