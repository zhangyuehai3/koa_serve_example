
const MomentService = require('../service/moment.service')

class momentConntroller{
   async create(ctx,next){
        const userId = ctx.user.id;
        const content = ctx.request.body.content
        const result = await MomentService.create(userId,content)
        ctx.body= result;
    }
    async detail(ctx,next){
        const momentId =ctx.params.momentId;
        const result = await MomentService.getMomentById(momentId)
        ctx.body = result
    }
    async list(ctx,next){
        const {offset,size} =ctx.query
        const result = await MomentService.getMomentList(offset,size)
        ctx.body =result
    }
}
module.exports = new momentConntroller()