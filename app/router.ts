import { Application } from 'egg';
import { User } from './database/entities/User';
import check from './middleware/check';
// import 'reflect-metadata';

export default (app: Application) => {
  const { controller, router } = app;
  // router.use(async (ctx, next) => {
  //   const start = Date.now();
  //   await next();
  //   const ms = Date.now() - start;
  //   ctx.logger.debug(`${ctx.method && ctx.method} ${ctx.url && ctx.url} - ${ms}ms`);


  // })
  const check = app.middleware.check()
  router.get('/models', check, controller.openAi.listModels);
  router.get('/model', check, controller.openAi.getModel);
  router.get('/chat', check, controller.openAi.createChatCompletion);
  router.post('/chat', check, controller.openAi.createChatCompletionPost);
  router.post('/register', check, controller.user.register);
  router.post('/login', controller.user.login);
};
