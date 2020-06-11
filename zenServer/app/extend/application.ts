import GraphQL from '../graphql/index';
import { Application } from 'egg';

const TYPE_GRAPHQL_SYMBOL = Symbol('Application#TypeGraphql');

export default {
  get graphql(): GraphQL {
    if (!this[TYPE_GRAPHQL_SYMBOL]) {
      this[TYPE_GRAPHQL_SYMBOL] = new GraphQL(this as Application);
    }
    return this[TYPE_GRAPHQL_SYMBOL];
  },
};

