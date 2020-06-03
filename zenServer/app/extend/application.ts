// app/extend/application.ts
import eggTsGraphql from './lib/eggTsGraphql';


export default {
  eggTsGraphql: eggTsGraphql.application.bind(this),
};
