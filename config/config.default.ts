import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_886';

  // add your egg config in here
  config.middleware = [];
  config.OPENAI_API_KEY = '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'
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
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
