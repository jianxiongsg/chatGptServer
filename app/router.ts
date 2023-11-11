import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.logger.debug(`${ctx.method && ctx.method} ${ctx.url && ctx.url} - ${ms}ms`);
  })
  router.get('/test', controller.home.index);
  // router.get('/log/userLogin', controller.log.login);
  // router.get('/log/userLogout', controller.log.logout);
  // router.get('/log/stageStart', controller.log.stageStart);
  // router.get('/log/stageFinish', controller.log.stageFinish);
  // router.get('/log/stageFail', controller.log.stageFail);
  // router.get('/log/itemBuy', controller.log.itemBuy);
  // router.get('/log/itemConsume', controller.log.itemConsume);
  // router.get('/log/event', controller.log.event);

};
