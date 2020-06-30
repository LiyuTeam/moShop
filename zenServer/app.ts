import 'reflect-metadata';
import { Application, IBoot } from 'egg';


export default class AppBoot implements IBoot {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async serverDidReady() {
    const { app } = this;
    await app.typeGraphql.init();
    await app.typeOrm.init();
    app.logger.info(`${app.typeGraphql.symbol.toString()} started`);
  }
}
