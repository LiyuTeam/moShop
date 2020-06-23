import typeGraphql from './lib/eggTsGraphql';
import { Application } from 'egg';


export default {
  get typeGraphql() {
    return typeGraphql.application(this as Application);
  },
};

