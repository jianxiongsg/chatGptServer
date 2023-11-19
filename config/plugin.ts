import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // tracer: {
  //   enable: true,
  //   package: 'egg-tracer',
  // },
  // 添加校验，直接用会报错，如果需要的话要参考一下文档
  // validate: {
  //   enable: false,
  //   package: 'egg-validate',
  // }
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};

export default plugin;
