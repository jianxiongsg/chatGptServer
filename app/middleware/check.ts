import { Context } from "egg";

export default () => {
    return async function check(ctx: Context, next) {
        await next();
        ctx.logger.info('check')
    };
}