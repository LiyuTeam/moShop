import { Service } from 'egg';
/**
 * User Service
 */
export default class User extends Service {

  public async insUser(props: { account: string }) {
    this.logger.info(this.ctx.entities);
    const user = new this.ctx.entities(this.ctx);
    user.account = props.account;

    const checkUser = await this.ctx.repo.user.findOne({ account: props.account });
    console.log(checkUser);
    if (!checkUser) {
      await user.save();
      return user;
    }
    return checkUser;
  }

  public async getUser(props: any) {
    const repo = await this.ctx.autoEntities.get('default#user')();
    this.logger.info(this.ctx.autoEntities, repo);
    return repo.createQueryBuilder()
      .where('user.account = :account', { account: props })
      .getOne();
  }
}
