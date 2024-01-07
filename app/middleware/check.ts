import { ResponseError } from "app/util/response";
import { Context } from "egg";

export default () => {
    return async function check(ctx: Context, next) {
        console.log('check', ctx.session.userInfo)
        if (ctx.session && ctx.session.userInfo) {
            await next();
        } else {
            throw new ResponseError({ code: 'NEED_LOGIN', message: '未登录,请先登录吧', status: 302 })

        }
    };
}