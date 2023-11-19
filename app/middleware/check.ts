import { Context } from "egg";

export default () => {
    return async function check(ctx: Context, next) {
        // 设置允许跨域的域名，可以使用通配符 "*" 表示允许所有域名
        ctx.set('Access-Control-Allow-Origin', '*');
        // 设置允许的请求方法
        ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        // 设置允许的请求头
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        // 设置是否允许发送Cookie
        ctx.set('Access-Control-Allow-Credentials', 'true');
        await next();
        ctx.logger.info('check')
    };
}