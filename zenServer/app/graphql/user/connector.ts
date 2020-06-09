
class UserConnector {
  ctx: any
  loader: any
  constructor(ctx) {
    this.ctx = ctx;
  }
  async getUser(account) {
    return await this.ctx.service.user.getUser(account);
  }
  async insUser(account, password?: string) {
    return await this.ctx.service.user.insUser({ account, password });
  }
}
module.exports = UserConnector;
