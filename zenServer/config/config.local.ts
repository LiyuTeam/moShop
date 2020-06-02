import { EggAppConfig, PowerPartial } from 'egg';
import graphqlConfig from './config.graphql';
import databaseConfig from './config.database';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.graphql = graphqlConfig;
  config.typeorm = databaseConfig;
  config.middleware = [ 'graphql' ];
  config.security = {
    csrf: {
      ignore: '/graphql',
    },
  };
  return config;
};
