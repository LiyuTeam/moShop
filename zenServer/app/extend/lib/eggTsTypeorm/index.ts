import { Application } from 'egg';
const extendSymbol = Symbol('eggTsTypeorm');

export default {
  application: (app: Application, props: any) => {
    console.log('graphql log', extendSymbol, props, app);
  },
};
