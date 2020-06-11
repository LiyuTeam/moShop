import { Service } from 'egg';
import { v4 as uuid } from 'uuid';
/**
 * User Service
 */
export default class User extends Service {

  public async insUser(props: { account?: string }) {
    const { ctx } = this;
    const user = Object.assign({ }, props, {
      account: props.account || new Date().toISOString() });
    const checkUser = await ctx.repo.UserAccount.findOne(user);
    console.log(checkUser);
    if (!checkUser) {
      await ctx.repo.UserAccount.save(Object.assign(user, { id: uuid() }));
      return user;
    }
    return checkUser;
  }

  public async getUser(props: any) {
    const { ctx } = this;
    ctx.logger.info('props', props);
    const user = await ctx.repo.UserAccount.findOne(props);
    ctx.logger.info('match', user);
    return user;
  }

  public async listUser(props?: any) {
    const { ctx } = this;
    ctx.logger.info('props', props);
    return await ctx.repo.UserAccount.find();
  }

}
