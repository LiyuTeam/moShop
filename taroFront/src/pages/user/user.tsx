import "taro-ui/dist/style/components/avatar.scss";
import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";

import { AtAvatar, AtNavBar } from "taro-ui";

import { observer, inject } from "@tarojs/mobx";

import UserForm from "../../components/userForm/UserForm";

import TabBar from "../../components/tabBar/TabBar";

import "./user.styl";

type PageStateProps = {
  counterStore: {
    counter: number;
    increment: Function;
    decrement: Function;
    incrementAsync: Function;
  };
};

interface User {
  props: PageStateProps;
}

@inject("counterStore")
@observer
class User extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "用户",
  };

  componentWillMount() {}

  componentWillReact() {
    console.log("componentWillReact");
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  increment = () => {
    const { counterStore } = this.props;
    counterStore.increment();
  };

  decrement = () => {
    const { counterStore } = this.props;
    counterStore.decrement();
  };

  incrementAsync = () => {
    const { counterStore } = this.props;
    counterStore.incrementAsync();
  };
  handleEdit = () => {
    console.log("handleEdit");
  };
  render() {
    const {
      counterStore: { counter },
    } = this.props;
    console.log(counter);
    const userData = [
      { label: "Name", field: "name", value: "凯文" },
      { label: "Nick Name", field: "nickname", value: "777" },
      { label: "Email", field: "email", value: "kevincn.tang@outlook.com" },
      { label: "Phone", field: "phone", value: "15011760892" },
    ];
    console.log(userData);
    return (
      <View className="user">
        <AtNavBar
          onClickRgIconSt={this.handleEdit}
          color="#000"
          rightFirstIconType="user"
        >
          <View>我的</View>
        </AtNavBar>
        {/*<UserForm userData={userData} />*/}
        <View className="header">
          <AtAvatar
            className="head_portrait"
            circle
            size="large"
            text="我的头像"
            image="https://jdc.jd.com/img/200"
          />
          <View className="name">凯文</View>
          <View className="vip">钻石会员</View>
          <View className="phone">15077777777</View>
        </View>
        <TabBar tabBarStore={[]} currentPage={4} />
      </View>
    );
  }
}

export default User as ComponentType;
