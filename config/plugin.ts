import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  tracer: {
    enable: true,
    package: 'egg-tracer',
  },
};

export default plugin;
