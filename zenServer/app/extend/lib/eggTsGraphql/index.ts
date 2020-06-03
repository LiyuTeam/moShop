import { Application } from 'egg';

const extendSymbol = Symbol('eggTsGraphql');

export default {
  application: (app: Application, props: any) => {
    console.log('graphql log', extendSymbol, props, app);
    return 'egg-ts-graphql';
  },
};
