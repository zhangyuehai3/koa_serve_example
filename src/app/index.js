const koa = require('koa');
const userRouter = require('../router/user.router')
const authRouter = require('../router/auth.router')
const bodyParser = require('koa-bodyParser')
const errorHandler = require("./error-handle")
const useRoutes =require('../router/index')
const app = new koa();

app.use(bodyParser())

useRoutes(app)
app.on('error', errorHandler)
module.exports =app