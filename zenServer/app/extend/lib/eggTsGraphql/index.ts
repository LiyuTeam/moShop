import { Application } from 'egg';
import TypeGraphql from './TypeGraphqlService';

const TYPE_GRAPHQL_SYMBOL = Symbol('Application#eggTsGraphql');

export default {
  application(app: Application): TypeGraphql {
    if (!this[TYPE_GRAPHQL_SYMBOL]) {
      this[TYPE_GRAPHQL_SYMBOL] = new TypeGraphql(app, TYPE_GRAPHQL_SYMBOL);
    }
    return this[TYPE_GRAPHQL_SYMBOL];
  },
};
