import { Application } from 'egg';
import TypeGraphql from './TypeGraphqlService';

const SYMBOL_EGG_TYPE_GRAPHQL = Symbol('Application#eggTsGraphql');

export default {
  application(app: Application): TypeGraphql {
    if (!this[SYMBOL_EGG_TYPE_GRAPHQL]) {
      this[SYMBOL_EGG_TYPE_GRAPHQL] = new TypeGraphql(app, SYMBOL_EGG_TYPE_GRAPHQL);
    }
    return this[SYMBOL_EGG_TYPE_GRAPHQL];
  },
};
