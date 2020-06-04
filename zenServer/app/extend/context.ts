// app/extend/context.ts
import { Context } from 'egg';
// import { autoEntities } from './lib/eggTsTypeorm/autoEntities';

export default {
  isAjax(this: Context) {
    return this.get('X-Requested-With') === 'XMLHttpRequest';
  },
  get autoEntities() {
    // return autoEntities.call(this, this as Context);
    return new Map();
  },
};

