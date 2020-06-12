import typeGraphql from './lib/eggTsGraphql';
import typeNuxt from './lib/eggTsNuxt';
import { Application } from 'egg';


export default {
  get typeGraphql() {
    return typeGraphql.application(this as Application);
  },
  get typeNuxt() {
    return typeNuxt.application(this as Application);
  },
};

