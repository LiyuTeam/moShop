import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import * as TypeGraphQL from 'type-graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
type FixDecorator<T> = T;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

/** 用户账户数据结构 */
export type UserAccount = UserAccountApiInterface & {
  __typename?: 'UserAccount';
  uuid: Scalars['String'];
  account: Scalars['String'];
  password: Scalars['String'];
  isAdmin: Scalars['Float'];
  userName: Scalars['String'];
  phone: Scalars['Float'];
  secretToken: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
};


export type UserAccountApiInterface = {
  /** 用户账户ID */
  uuid: Scalars['String'];
  /** 用户账户(邮箱) */
  account: Scalars['String'];
  /** 用户密码 */
  password: Scalars['String'];
  /** 是否管理员 */
  isAdmin: Scalars['Float'];
  /** 用户昵称 */
  userName: Scalars['String'];
  /** 用户手机 */
  phone: Scalars['Float'];
  /** 用户秘钥 */
  secretToken: Scalars['String'];
  /** 创建时间 */
  createdAt: Scalars['Timestamp'];
  /** 更新时间 */
  updatedAt: Scalars['Timestamp'];
};

export type Query = {
  __typename?: 'Query';
  getUser: UserAccount;
  listUser: Array<UserAccount>;
  loginUser: Scalars['Boolean'];
  userAccount: UserAccount;
};


export type QueryGetUserArgs = {
  account?: Maybe<Scalars['String']>;
};


export type QueryLoginUserArgs = {
  password: Scalars['String'];
  account: Scalars['String'];
};


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  UserAccount: ResolverTypeWrapper<UserAccount>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  UserAccountAPIInterface: ResolversTypes['UserAccount'];
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  UserAccount: UserAccount;
  String: Scalars['String'];
  Float: Scalars['Float'];
  Timestamp: Scalars['Timestamp'];
  UserAccountAPIInterface: ResolversParentTypes['UserAccount'];
  Query: {};
  Boolean: Scalars['Boolean'];
};

export type UserAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAccount'] = ResolversParentTypes['UserAccount']> = {
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  secretToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type UserAccountApiInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAccountAPIInterface'] = ResolversParentTypes['UserAccountAPIInterface']> = {
  __resolveType: TypeResolveFn<'UserAccount', ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  secretToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getUser?: Resolver<ResolversTypes['UserAccount'], ParentType, ContextType, RequireFields<QueryGetUserArgs, never>>;
  listUser?: Resolver<Array<ResolversTypes['UserAccount']>, ParentType, ContextType>;
  loginUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryLoginUserArgs, 'password' | 'account'>>;
  userAccount?: Resolver<ResolversTypes['UserAccount'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  UserAccount?: UserAccountResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  UserAccountAPIInterface?: UserAccountApiInterfaceResolvers;
  Query?: QueryResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

@TypeGraphQL.InterfaceType()
export abstract class UserAccountApiInterface {
  /** 用户账户ID */

  @TypeGraphQL.Field(type => String)
  uuid!: Scalars['String'];
  /** 用户账户(邮箱) */

  @TypeGraphQL.Field(type => String)
  account!: Scalars['String'];
  /** 用户密码 */

  @TypeGraphQL.Field(type => String)
  password!: Scalars['String'];
  /** 是否管理员 */

  @TypeGraphQL.Field(type => TypeGraphQL.Float)
  isAdmin!: Scalars['Float'];
  /** 用户昵称 */

  @TypeGraphQL.Field(type => String)
  userName!: Scalars['String'];
  /** 用户手机 */

  @TypeGraphQL.Field(type => TypeGraphQL.Float)
  phone!: Scalars['Float'];
  /** 用户秘钥 */

  @TypeGraphQL.Field(type => String)
  secretToken!: Scalars['String'];
  /** 创建时间 */

  @TypeGraphQL.Field(type => any)
  createdAt!: Scalars['Timestamp'];
  /** 更新时间 */

  @TypeGraphQL.Field(type => any)
  updatedAt!: Scalars['Timestamp'];
}

/** 用户账户数据结构 */
@TypeGraphQL.ObjectType({ implements: UserAccountApiInterface })
export class UserAccount extends UserAccountApiInterface {
  __typename?: 'UserAccount';

  @TypeGraphQL.Field(type => String)
  uuid!: Scalars['String'];

  @TypeGraphQL.Field(type => String)
  account!: Scalars['String'];

  @TypeGraphQL.Field(type => String)
  password!: Scalars['String'];

  @TypeGraphQL.Field(type => TypeGraphQL.Float)
  isAdmin!: Scalars['Float'];

  @TypeGraphQL.Field(type => String)
  userName!: Scalars['String'];

  @TypeGraphQL.Field(type => TypeGraphQL.Float)
  phone!: Scalars['Float'];

  @TypeGraphQL.Field(type => String)
  secretToken!: Scalars['String'];

  @TypeGraphQL.Field(type => any)
  createdAt!: Scalars['Timestamp'];

  @TypeGraphQL.Field(type => any)
  updatedAt!: Scalars['Timestamp'];
}


export class Query {
  __typename?: 'Query';

  @TypeGraphQL.Field(type => UserAccount)
  getUser!: FixDecorator<UserAccount>;

  @TypeGraphQL.Field(type => [ UserAccount ])
  listUser!: Array<UserAccount>;

  @TypeGraphQL.Field(type => Boolean)
  loginUser!: Scalars['Boolean'];

  @TypeGraphQL.Field(type => UserAccount)
  userAccount!: FixDecorator<UserAccount>;
}


@TypeGraphQL.ArgsType()
export class QueryGetUserArgs {

  @TypeGraphQL.Field(type => String, { nullable: true })
  account!: Maybe<Scalars['String']>;
}


@TypeGraphQL.ArgsType()
export class QueryLoginUserArgs {

  @TypeGraphQL.Field(type => String)
  password!: Scalars['String'];

  @TypeGraphQL.Field(type => String)
  account!: Scalars['String'];
}
