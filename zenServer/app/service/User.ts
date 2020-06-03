import { Service } from 'egg';
import UserModel from '../entities/User';
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
    this.logger.info(this.ctx.entities);
    return await UserModel.createQueryBuilder()
      .where('user.account = :account', { account: props })
      .getOne();
  }
}
