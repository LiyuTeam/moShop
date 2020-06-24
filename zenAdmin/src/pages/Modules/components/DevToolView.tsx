import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import  apolloClient  from '@/libs/apollo-graphql';
import { connect } from 'umi';
import { CurrentUser } from '@/pages/Modules/data';
import { Empty, Input } from 'antd';
import style from './DevToolView.less';

class DevToolView extends Component {
  view: HTMLDivElement | undefined = undefined;

  render() {
    const devToolHost = 'https://graphql.org/swapi-graphql';

    return (
      <ApolloProvider client={apolloClient}>
        <Input addonBefore="http://" defaultValue={devToolHost}/>
        <iframe src={devToolHost}
                className={style.devToolBody}
                frameBorder="0"
        />
        <Empty/>
      </ApolloProvider>
    );
  }
}

export default connect(
  ({ modules }: { modules: { currentUser: CurrentUser } }) => ({
    currentUser: modules.currentUser,
  }),
)(DevToolView);
