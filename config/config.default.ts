import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_886';

  // add your egg config in here
  // config.middleware = ['check', 'errorHandler'];
  config.openAi = {
    apiKey: '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',
    proxy: 'http://127.0.0.1:7890',
    defaultOpenAIRequestOptions: {
      temperature: 0.8,
      top_p: 1,
      max_tokens: 2000,
      presence_penalty: 0,
      frequency_penalty: 0,
    }
  }
  // add your special config in here
  const bizConfig = {
    session: {
      key: 'openai_session',
      maxAge: 24 * 3600 * 1000, // 最大有效时间，单位为毫秒
    },
    errorHandler: {
      defaultError: 'Internal Server Error'
    }
  };
  // egg端口号
  config.cluster = {
    listen: {
      // path: '',
      port: 3000,
      hostname: '127.0.0.1',
    }
  };
  // TODO初步解决跨域问题，后面要单独处理
  config.cors = {
    origin: '*', // 设置允许跨域的源，可以设置为具体的域名或 '*'（表示允许所有源）
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH', // 设置允许的 HTTP 方法
  };
  config.security = {
    csrf: {
      enable: false, // 禁用 CSRF
    },
    domainWhiteList: [], // 将需要跨域的域名添加到白名单中
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
