import { Field, InterfaceType, ObjectType, Arg, Ctx, Query, Resolver } from 'type-graphql';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { Context } from 'egg';

@InterfaceType()
abstract class UserAccountAPIInterface implements UserAccountEntityType {
  @Field(() => String, { description: '用户账户ID' })
  uuid: string

  @Field({ description: '用户账户(邮箱)' })
  @IsEmail({}, { message: '用户必须是邮箱' })
  account: string

  @Field({ description: '用户密码' })
  password: string

  @Field({ description: '是否管理员' })
  isAdmin: number;

  @Field({ description: '用户昵称' })
  userName: string;

  @Field({ description: '用户手机' })
  @IsPhoneNumber('CH', { message: '必须是有效的手机号码' })
  phone: number;

  @Field({ description: '用户秘钥' })
  secretToken: string;

  @Field({ description: '创建时间' })
  createdAt: Date;

  @Field({ description: '更新时间' })
  updatedAt: Date;
}

@ObjectType({ implements: UserAccountAPIInterface, description: '用户账户数据结构' })
export class UserAccount implements UserAccountAPIInterface {
  @Field() account: string;
  @Field() isAdmin: number;
  @Field() password: string;
  @Field() phone: number;
  @Field() secretToken: string;
  @Field() userName: string;
  @Field() uuid: string;
  @Field() createdAt: Date;
  @Field() updatedAt: Date;
}


@Resolver(UserAccount)
export class UserAccountResolver {

  @Query(() => UserAccount)
  async getUser(
    @Ctx() ctx: Context,
      @Arg('account', { nullable: true }) account?: string,
  ): Promise<any> {
    return await ctx.service.user.getUser({ account });
  }

  @Query(() => [ UserAccount ])
  async listUser(
    @Ctx() ctx: Context,
  ): Promise<any> {
    return await ctx.service.user.listUser();
  }

  @Query(() => Boolean)
  async loginUser(
  @Ctx() ctx: Context,
    @Arg('account') account?: string,
    @Arg('password') password?: string,
  ) {
    return await ctx.service.user.loginUser({ account, password });
  }

  @Query(() => UserAccount)
  async userAccount(
  @Ctx() ctx: Context,
  ) {
    const res = await this.listUser(ctx);
    return res[0];
  }

}
