import React,{Component} from "react";
import {connect} from "@@/plugin-dva/exports";
import {CurrentUser} from "@/pages/Modules/data";

interface BaseViewProps {
  currentUser?: CurrentUser
}

class UnitsView extends Component<BaseViewProps> {
  view: HTMLDivElement | undefined = undefined;

  render() {

    return (
      <div>Hello units</div>
    );
  }
}

export default connect(
  ({modules}: { modules: { currentUser: CurrentUser } }) => ({
    currentUser: modules.currentUser,
  })
)(UnitsView)
