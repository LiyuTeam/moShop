import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  graphql: {
    enable: true,
    package: 'egg-graphql',
  },
  typeorm: {
    enable: true,
    package: 'egg-ts-typeorm',
  },
};

export default plugin;
