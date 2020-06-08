// app/extend/application.ts
import eggTsGraphql from './lib/eggTsGraphql';
import from './lib/zenGate';

export default {
  eggTsGraphql: eggTsGraphql.application.bind(this),
};
