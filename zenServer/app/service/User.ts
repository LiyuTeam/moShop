import { Service } from 'egg';

/**
 * Test Service
 */
export default class User extends Service {

  public async insUser(props: {account: string}) {
    const user = new this.ctx.entities.User();
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
    console.log(this.ctx.entitles);
    console.log(this.ctx.repo);
    return await this.ctx.repo.user.createQueryBuilder('user')
      .where('user.account = :account', { account: props })
      .getOne();
  }
}
