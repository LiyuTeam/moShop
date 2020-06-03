// app/extend/context.ts
import { Context } from 'egg';
import { autoEntities } from './lib/eggTsTypeorm/autoEntities';

export default {
  isAjax(this: Context) {
    return this.get('X-Requested-With') === 'XMLHttpRequest';
  },
  get autoEntities() {
    if (!this[Symbol('autoEntities')]) {
      this[Symbol('autoEntities')] = autoEntities(this as Context);
    }
    return this[Symbol('autoEntities')];
  },
};

