import { Service } from 'egg';
import { v4 as uuid } from 'uuid';
// import { Repository } from 'typeorm';
/**
 * User Service
 */
export default class User extends Service {

  public async insUser(props: { account?: string }) {
    const { ctx } = this;
    const user = Object.assign({ }, props, {
      account: props.account || new Date().toISOString() });
    const checkUser = await ctx.repo.User.findOne(user);
    console.log(checkUser);
    if (!checkUser) {
      await ctx.repo.User.save(Object.assign(user, { id: uuid() }));
      return user;
    }
    return checkUser;
  }

  public async getUser(props: any) {
    const { ctx } = this;
    // const repos = await this.ctx.autoEntities;
    // const repo: Repository<any> = await repos.get('default#user')();
    // this.logger.info('repo', repos, repo);
    const repo = await ctx.repo.User;
    return repo.createQueryBuilder('user')
      .where('account = :account', { account: props })
      .getOne();
  }

}
