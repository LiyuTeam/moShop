import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import graphqlConfig from './config.graphql';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1590863397980_2851';
  config.graphql = graphqlConfig;
  config.typeoprm = {
    enable: true,
    package: 'egg-ts-typeorm',
  };

  // add your egg config in here
  config.middleware = [ 'graphql' ];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
