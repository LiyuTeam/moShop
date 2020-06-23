import React, {Component} from "react";
import {ApolloProvider} from "react-apollo";
import Apollo from "@/libs/apollo-graphql";
import {connect} from "umi";
import {CurrentUser} from "@/pages/Modules/data";

class DevToolView extends Component<BaseViewProps> {
  view: HTMLDivElement | undefined = undefined;

  render() {
    return (
      <ApolloProvider client={Apollo}>
        <div>
          <h2>My first Apollo app 🚀</h2>
        </div>
        <iframe src='https://graphql.org/swapi-graphql'
                frameBorder="0"
                width='900'
                height='640' />
      </ApolloProvider>
    )
  }
}

export default connect(
  ({modules}: { modules: { currentUser: CurrentUser } }) => ({
    currentUser: modules.currentUser,
  }),
)(DevToolView);
