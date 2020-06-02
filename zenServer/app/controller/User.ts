import { Controller } from 'egg';

export default class UserController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUser({ account: 'admin' });
  }

  public async addUser() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.insUser({ account: String(Math.random() * 1000000) });
  }
}
