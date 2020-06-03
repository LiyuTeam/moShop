// ts-ignore
export default {
  router: '/graphql',
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
  // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
  graphiql: true,
  // 是否设置默认的Query和Mutation, 默认关闭
  defaultEmptySchema: false,
  // graphQL 路由前的拦截器
  // * onPreGraphQL(ctx) {
  // },
  // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
  // * onPreGraphiQL(ctx) {
  // },
  // apollo server的透传参数，参考[文档](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#parameters)
  // apolloServerOptions: {
  //   rootValue,
  //   formatError,
  //   formatResponse,
  //   mocks,
  //   schemaDirectives,
  //   introspection,
  //   playground,
  //   debug,
  //   validationRules,
  //   tracing,
  //   cacheControl,
  //   subscriptions,
  //   engine,
  //   persistedQueries,
  //   cors,
  // },
};

