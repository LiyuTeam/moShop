import { Application } from 'egg';
import { GraphQLSchema } from 'graphql';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-koa';

export interface GraphQLConfig {
  router: string;
  graphiql: boolean;
}

export default class TypeGraphql {
  public symbol: symbol;
  private readonly app: Application;
  private graphqlSchema: GraphQLSchema;
  private config: GraphQLConfig;

  constructor(app: Application, symbol: symbol) {
    this.app = app;
    this.config = app.config.graphql;
    this.symbol = symbol;
  }

  getResolvers(): [string] {
    const isLocal = this.app.env === 'local';
    return [ path.resolve(this.app.baseDir, `app/graphql/schema/**/*.${isLocal ? 'ts' : 'js'}`) ];
  }

  async init() {
    try {
      // console.log(this.getResolvers());
      this.graphqlSchema = await buildSchema({
        resolvers: this.getResolvers(),
        dateScalarMode: 'timestamp',
        // automatically create `schema.gql` file with schema definition in project's working directory
        emitSchemaFile: {
          // path: 'app/../schema.gql',
          path: path.join('app', 'public', 'graphql', 'AllSchema.graphql'),
          commentDescriptions: true,
          sortedSchema: false, // by default the printed schema is sorted alphabetically
        },
      });
    } catch (e) {
      console.trace(e);
    }
    const server = new ApolloServer({
      schema: this.graphqlSchema,
      tracing: true,
      context: ({ ctx }) => ctx, // 将 egg 的 context 作为 Resolver 传递的上下文
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      } as any,
      introspection: true,
    });
    server.applyMiddleware({
      app: this.app,
      path: this.config.router,
      cors: false,
    });
    this.app.logger.info('graphql server init');

  }

  // async query({query, var})

  get schema(): GraphQLSchema {
    return this.graphqlSchema;
  }
}
