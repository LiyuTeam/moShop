import ApolloClient from 'apollo-boost';

const config = {
  uri: 'https://48p1r2roz4.sse.codesandbox.io/',
};

export default (uri?: string) => {
  return new ApolloClient(Object.assign({}, config, { uri: uri ?? config.uri }));
};

// export default {ApolloProvider,apolloClient};

