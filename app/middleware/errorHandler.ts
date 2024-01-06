import { Context, Application, EggAppConfig } from 'egg';


export default () => {
    return async function errorHandler(ctx: Context, next: () => Promise<any>) {
        try {
            await next();
        } catch (err: any) {
            ctx.logger.error(err);
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            ctx.app.emit('error', err, ctx);
            const message = err?.message || '网络异常，请稍后再试'
            const status = err?.status || 500;
            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const code =
                status === 500 && ctx.app.config.env === 'prod'
                    ? 'INTERNAL_SERVER_ERROR' // 'InternalServerError'
                    : err.code;

            // 从 error 对象上读出各个属性，设置到响应中
            ctx.body = { code, message };
            ctx.status = status;
        }
    };
}