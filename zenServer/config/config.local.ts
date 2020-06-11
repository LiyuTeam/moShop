import { EggAppConfig, PowerPartial } from 'egg';
import graphqlConfig from './config.graphql';
import databaseConfig from './config.database';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.env = 'local';
  config.graphql = graphqlConfig;
  config.typeorm = databaseConfig;
  // config.middleware = [ 'graphql' ];
  config.security = {
    csrf: {
      ignore: [ '/graphql', '/graphql2' ],
    },
  };
  return config;
};
