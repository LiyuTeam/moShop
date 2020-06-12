import { EggAppConfig, PowerPartial } from 'egg';
import graphqlConfig from './config.graphql';
import databaseConfig from './config.database';
import nuxtConfig from './config.nuxt';
export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.env = 'local';
  config.graphql = graphqlConfig;
  config.typeorm = databaseConfig;
  config.nuxt = nuxtConfig;
  // config.middleware = [ 'graphql' ];
  config.security = {
    csrf: {
      ignore: [ '/graphql' ],
    },
  };
  return config;
};
