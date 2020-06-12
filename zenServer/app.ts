import 'reflect-metadata';
import { Application } from 'egg';


export default async (app: Application) => {
  await app.typeGraphql.init();
  app.logger.info(`${app.typeGraphql.symbol.toString()} started`);
  await app.typeNuxt.build();
  app.logger.info(`${app.typeNuxt.symbol.toString()} started`);

};
