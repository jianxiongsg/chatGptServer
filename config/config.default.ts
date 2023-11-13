import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_886';

  // add your egg config in here
  config.middleware = ['check', 'errorHandler'];
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
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
