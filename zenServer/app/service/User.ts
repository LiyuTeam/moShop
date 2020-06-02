import { Service } from 'egg';
import { getConnection } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';
/**
 * Test Service
 */
export default class User extends Service {

  conn: Connection

  constructor(props: any) {
    super(props);
    this.conn = getConnection();
  }

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
    console.debug('entities', this.ctx.entities);
    console.debug('repo', this.ctx.repo);
    console.debug('repo', this.conn);
    // return await this.ctx.service.graphql.query(JSON.stringify({ query: `{ user(account: ${props.account}) { account is_admin } }` }));
    // return await this.ctx.repo.User.createQueryBuilder('user')
    //   .where('user.account = :account', { account: props })
    //   .getOne();
    return await this.ctx.entities.User.find({ account: props.account });
  }
}
