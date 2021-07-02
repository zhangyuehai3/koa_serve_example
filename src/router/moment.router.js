const Router = require('koa-router')
const {create,detail,list} =require('../controller/moment.controller')
const {verifyauth} = require('../middleware/auth.middleware')


const momentRouter = new Router({prefix:'/moment'})

momentRouter.post('/',verifyauth,create);
momentRouter.get('/:momentId',detail);
momentRouter.get('/',list)

module.exports =momentRouter