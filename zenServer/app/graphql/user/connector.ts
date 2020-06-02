class UserConnector {
  ctx: any

  constructor(ctx) {
    this.ctx = ctx;
  }
  async getUser(account) {
    return await this.ctx.service.user.getUser(account);
  }
}
module.exports = UserConnector;
