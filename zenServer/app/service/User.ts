import { Service } from 'egg';
import { v4 as uuid } from 'uuid';
import { getRepository } from 'typeorm';

/**
 * User Service
 */
export default class User extends Service {

  public async insUser(props: { account?: string }) {
    const { ctx } = this;
    const user = Object.assign({}, props, {
      account: props.account || new Date().toISOString(),
    });
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
    const UserEntity = await ctx.autoEntities.get('default#userAccount'),
      UserRepo = getRepository(UserEntity);

    return UserRepo.findOne();

  }

  public async loginUser(props: { account?: string; password?: string }) {
    const { ctx } = this;
    ctx.logger.info('props', props);
    const loginUser: any|UserAccountEntityType = await ctx.repo.UserAccount.findOne({ account: props.account });
    if (loginUser && loginUser.password === props.password) {
      loginUser.isAdmin = true;
      loginUser.updatedAt = new Date();
      await ctx.repo.UserAccount.save(loginUser);
      return true;
    }
    return false;

  }
}
