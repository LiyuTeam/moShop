import * as DataLoader from 'dataloader';

class UserConnector {
  ctx: any
  loader: any
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.getUser.bind(this));
  }
  async getUser(account) {
    return await this.ctx.service.user.getUser(account);
  }
}
module.exports = UserConnector;
