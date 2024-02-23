import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + 'chat_gpt_550';

  // add your egg config in here
  config.middleware = ['errorHandler'];
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
      // httpOnly: true,
      // encrypt: true, // 加密
      renew: true, // 每次访问页面都会给 session 延长时间
    }
  };
  // egg端口号
  config.cluster = {
    listen: {
      // path: '',
      port: 3000,
      hostname: '0.0.0.0',
    }
  };
  // TODO初步解决跨域问题，后面要单独处理
  config.cors = {
    origin: (ctx) => {
      const allowedOrigins = [
        'http://127.0.0.1:3000',
        'https://www.mygoodchatgpt.com',
        'https://mygoodchatgpt.com',
      ];
      const origin = ctx.request.header.origin;
      if (origin && allowedOrigins.includes(origin)) {
        return origin; // 允许这个域
      }
      return 'http://127.0.0.1:3000'; // 返回默认域或拒绝请求
    },//'http://127.0.0.1:3000' // 设置允许跨域的源，可以设置为具体的域名或 '*'（表示允许所有源）
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH', // 设置允许的 HTTP 方法
    credentials: true, // 重要：允许 Egg.js 应用接收和发送凭证（如 cookies）
  };
  config.security = {
    csrf: {
      enable: false, // 禁用 CSRF
    },
    domainWhiteList: [], // 将需要跨域的域名添加到白名单中
  };
  config.typeorm = {
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "study",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
  }
  config.cache = {
    default: 'memory', // 默认缓存类型为内存
    stores: {
      memory: {
        driver: 'memory', // 内存缓存类型
        max: 100, // 缓存最大数量
        ttl: 0, // 缓存默认过期时间，0 表示永不过期
      }
    }
  }
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
