import { Controller } from 'egg';


export default class UserController extends Controller {
  public async index() {
    const { ctx } = this;
    this.logger.info('default eti', this.ctx.autoEntities);
    ctx.body = await this.ctx.service.user.getUser('test');
  }


  public async addUser() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.insUser({ account: String(Math.random() * 1000000) });
  }

  public async login() {
    const { ctx } = this;
    console.log(ctx);
  }
}
