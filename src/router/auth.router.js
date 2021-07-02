const Router = require('koa-router')
const {login,success} =require('../controller/auth.controller')
const {verifyLogin,handlePassword,verifyauth} = require('../middleware/auth.middleware')

const authRouter = new Router()

authRouter.post('/login',verifyLogin,handlePassword,login)
authRouter.post('/test',verifyauth,success)
module.exports =authRouter