import "taro-ui/dist/style/components/avatar.scss";
import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView  } from "@tarojs/components";

import Profile from './profile'
import Menu from './menu'
import { dispatchCartNum } from '@actions/cart'
import { getWindowHeight } from "@utils/style"


import { AtAvatar, AtNavBar } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
import UserForm from "../../components/userForm/UserForm";
import TabBar from "../../components/tabBar/TabBar";

import "./user.styl";

type PageStateProps = {
  counterStore: {
    counter: number
    increment: Function
    decrement: Function
    incrementAsync: Function
    userInfo: object
  }
};

interface User {
  props: PageStateProps
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
    navigationBarTitleText: '个人中心'
  };

  handleLogin = () => {
    Taro.navigateTo({
      url: '/pages/user-login/user-login'
    })
  }

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
    const userData = [
      { label: "Name", field: "name", value: "凯文" },
      { label: "Nick Name", field: "nickname", value: "777" },
      { label: "Email", field: "email", value: "kevincn.tang@outlook.com" },
      { label: "Phone", field: "phone", value: "15011760892" },
    ];
    const { userInfo } = this.props
    console.log(userData);
    return (
      <View className='user'>
        <ScrollView
          scrollY
          className='user__wrap'
          style={{ height: getWindowHeight() }}
        >
          <Profile userInfo={userInfo} />
          <Menu />
          {userInfo.login &&
          <View className='user__logout' onClick={this.handleLogin}>
            <Text>切换账号</Text>
          </View>
          }
          <View className='user__empty' />
        </ScrollView>
        <View className='user__activity'>
          <Activity />
        </View>
      </View>
    )
  }
}

export default User as ComponentType;
