import 'reflect-metadata';
import { Application } from 'egg';

export default async (app: Application) => {
  // @ts-ignore
  await app.graphql.init();
  app.logger.info('started');
};
