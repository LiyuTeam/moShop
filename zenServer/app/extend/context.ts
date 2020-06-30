// app/extend/context.ts
import { Context } from 'egg';

export default {

  isAjax(this: Context) {
    return this.get('X-Requested-With') === 'XMLHttpRequest';
  },
};

