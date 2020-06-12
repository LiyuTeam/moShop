import { Nuxt, Builder } from 'nuxt';
import { Application } from 'egg';

export default class TypeNuxtService {
  public symbol: symbol
  config: any
  nuxt: any

  constructor(app: Application, symbol: symbol) {
    this.symbol = symbol;
    this.config = Object.assign({}, this.config, app.config?.nuxt || {});
    console.log('-> this.config', this.config);
  }

  /**
   * 初始化
   */
  async build() {
    this.nuxt = new Nuxt(this.config);
    const builder = new Builder(this.nuxt);
    await builder.build();
    return this.nuxt;
  }

  /**
   * 渲染
   * @param req
   * @param res
   */
  render(req, res) {
    return new Promise(async resolve => {
      await this.nuxt.ready();
      resolve(this.nuxt.render(req, res));
    });
  }
}
