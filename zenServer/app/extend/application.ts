import typeGraphql from './lib/eggTsGraphql';
import typeOrm from './lib/eggTsTypeorm';
import { Application } from 'egg';

export default {
  get typeGraphql() {
    return typeGraphql.application(this as Application);
  },
  get typeOrm() {
    return typeOrm.appliction(this as Application);
  },
};

