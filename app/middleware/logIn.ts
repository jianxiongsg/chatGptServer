import { Context } from "egg";

export default () => {
    return async function login(ctx: Context, next) {
        await next();
        ctx.logger.info('login')
    };
}