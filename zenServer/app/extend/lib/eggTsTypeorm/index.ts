import { Application } from 'egg';
import TypeOrmService from './TypeOrmService';
const SYMBOL_EGG_TYPEORM = Symbol('eggTsTypeorm');

export default {
  appliction(app: Application): TypeOrmService {
    if (!this[SYMBOL_EGG_TYPEORM]) {
      this[SYMBOL_EGG_TYPEORM] = new TypeOrmService(app, SYMBOL_EGG_TYPEORM);
    }
    return this[SYMBOL_EGG_TYPEORM];
  },
};
