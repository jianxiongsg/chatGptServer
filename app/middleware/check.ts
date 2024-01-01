import { Context } from "egg";

export default () => {
    return async function check(ctx: Context, next) {
        console.log(ctx);
        await next();
        return;
        // if (ctx.session && ctx.session.loggedIn) {
        //     await next();
        // } else {
        //     ctx.status = 401; // 未授权的访问
        //     ctx.body = 'Unauthorized access, please login first.';
        // }
    };
}