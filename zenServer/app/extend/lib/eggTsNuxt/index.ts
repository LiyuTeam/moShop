
import { Application } from 'egg';
import TypeNuxtService from './TypeNuxtService';
const TYPE_NUXT_SYMBOL = Symbol('Application#eggTsNuxt');

export default {
  application(app: Application): TypeNuxtService {
    if (!this[TYPE_NUXT_SYMBOL]) {
      this[TYPE_NUXT_SYMBOL] = new TypeNuxtService(app, TYPE_NUXT_SYMBOL);
    }
    return this[TYPE_NUXT_SYMBOL];
  },
};
