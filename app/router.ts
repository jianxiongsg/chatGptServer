import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.logger.debug(`${ctx.method && ctx.method} ${ctx.url && ctx.url} - ${ms}ms`);
  })
  router.get('/models', controller.openAi.listModels);
  router.get('/model', controller.openAi.getModel);
  router.get('/chat', controller.openAi.createChatCompletion);
  router.post('/chat', controller.openAi.createChatCompletionPost);
  router.post('/chatTest', controller.openAi.getChatGptResponse);
  router.get('/test', controller.home.index);

};
