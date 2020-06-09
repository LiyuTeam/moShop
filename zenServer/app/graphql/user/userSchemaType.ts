import { GraphQLBoolean, GraphQLEnumType, GraphQLObjectType, GraphQLString } from 'graphql';

const statusField = new GraphQLEnumType({
  name: 'status',
  description: '状态',
  values: {
    1: { value: '可用' }, 2: { value: '不可用' },
  },
});

export default new GraphQLObjectType<GraphQLObjectType>({
  name: 'userAccount',
  fields: {
    id: { type: GraphQLString },
    account: { type: GraphQLString },
    password: { type: GraphQLString },
    is_test: { type: GraphQLBoolean },
    status: { type: statusField },
  },
});
