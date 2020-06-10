import { GraphQLBoolean, GraphQLEnumType, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

const statusField = new GraphQLEnumType({
  name: 'status',
  description: '状态',
  type: GraphQLInt,
  values: {
    1: { value: 1, description: '可用' }, 2: { value: 2, description: '不可用' },
  },
});

export default new GraphQLObjectType<GraphQLObjectType>({
  name: 'userAccount',
  fields: () => ({
    id: { type: GraphQLString, description: '用户ID' },
    account: { type: GraphQLString, description: '用户账户' },
    password: { type: GraphQLString, description: '用户密码' },
    is_test: { type: GraphQLBoolean, description: '测试账号' },
    is_admin: { type: GraphQLBoolean, description: '超级管理员' },
    status: { type: GraphQLInt, args: { unit: { type: statusField } } },
  }),
});
