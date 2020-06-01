import { EggAppConfig, PowerPartial } from 'egg';
import graphqlConfig from './config.graphql';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.graphql = graphqlConfig;
  config.middleware = [ 'graphql' ];
  config.security = {
    csrf: {
      ignore: '/graphql',
    },
  };
  return config;
};
