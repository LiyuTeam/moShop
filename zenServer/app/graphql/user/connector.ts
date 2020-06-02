import * as DataLoader from 'dataloader';

class UserConnector {
  ctx: any
  loader: any
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.getUser.bind(this));
  }
  async getUser(account) {
    // return await this.ctx.service.user.getUser(account)
    return this.ctx.repo.User.createQueryBuilder()
      .where('user.account = :account', { account })
      .getOne();
  }
}
module.exports = UserConnector;
