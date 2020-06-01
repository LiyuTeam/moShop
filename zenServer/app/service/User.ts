import { Service } from 'egg';
import UserModel from '../entities/User';

/**
 * Test Service
 */
export default class User extends Service {

  public async insUser(name: string) {
    const user = new UserModel();
    user.account = name;

    const checkUser = await UserModel.findOne({ account: name });
    console.log(checkUser);
    if (!checkUser) {
      await user.save();
      return user;
    }
    return checkUser;
  }

  public async getUser(props: any) {
    return await UserModel.findOne({ account: props });
  }
}
