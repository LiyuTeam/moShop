import { Application, Context } from 'egg';
import { autoEntities } from './autoEntities';
const extendSymbol = Symbol('eggTsTypeorm');

export default {
  application: (app: Application, props: any) => {
    console.log('graphql log', extendSymbol, props, app);
  },
  context: (ctx: Context, props: any) => {

  },
};
