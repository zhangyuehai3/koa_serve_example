// 第三方
const jwt =require('jsonwebtoken')



const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require("../utils/password-handle")
const { PUBLIC_KEY } = require('../app/config')


const verifyLogin = async (ctx, next) => {
    const { name, password } = ctx.request.body;
    if (!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx);
    }

    const result = await service.getUserByName(name);
  
    const user = result[0]
    if (!user) {
        const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
        return ctx.app.emit('error', error, ctx);
    }
    if (md5password(password) !== user.password) {
        const error = new Error(errorTypes.PASSWORD_IS_INCORRENT); 
        return ctx.app.emit('error', error, ctx);
    }

    ctx.user =user
    await next()
}
const handlePassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    ctx.request.body.password = md5password(password)
    await next()
}
const verifyauth =async (ctx,next)=>{
    const authorization = ctx.headers.authorization;
    const token = authorization.replace('Bearer','');
    try{
        const result = jwt.verify(token,PUBLIC_KEY,{
            algorithms:["RS256"]
        });
        ctx.user = result;
        await next()
    }
    catch(err){
      const error = new Error(errorType.UNAUTHORIZATION)
      ctx.app.emit('error',error)
    }
}
module.exports = {
    verifyLogin,
    handlePassword,
    verifyauth
}