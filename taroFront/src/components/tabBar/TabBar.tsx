/**
 * desc：  TabBar
 * author：Kevin
 * date：  2020/6/1
 **/
import Taro, { Component } from '@tarojs/taro';
import { View } from "@tarojs/components";
import AtComponent from "taro-ui/types/base";
import { AtTabBar } from 'taro-ui'
import './TabBar.styl';

export interface UserFormProps extends AtComponent {
  /**
   * @default [] * 用户信息
   */
  tabBarData: any[]
}
class TabBar extends Component<UserFormProps> {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      current: 0
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })

    switch (value) {
      case 0:
        Taro.redirectTo({
          url: '/pages/shop/shop'
        }).then(r =>{
          console.log(r)
        }).catch((error) => {
          console.log(error);
          /* 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 */
          // wx.switchTab({url: '/pages/index/index'})
        })
        break;

      case 1:
        Taro.redirectTo({
          url:'/pages/index/index'
        }).then(r =>{
          console.log(r)
        }).catch((error) => {
          console.log(error);
          /* 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 */
          // wx.switchTab({url: '/pages/index/index'})
        })
        break;

      case 2:
        Taro.redirectTo({
          url:'/pages/index/index'
        }).then(r =>{
          console.log(r)
        })
        break;

      case 3:
        Taro.redirectTo({
          url:'/pages/index/index'
        }).then(r =>{
          console.log(r)
        }).catch((error) => {
          console.log(error);
          /* 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 */
          // wx.switchTab({url: '/pages/index/index'})
        })
        break;

      case 4:
        Taro.redirectTo({
          url: '/pages/user/user'
        }).then(r =>{
          console.log(r)
        }).catch((error) => {
          console.log(error);
          /* 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 */
          // wx.switchTab({url: '/pages/index/index'})
        })
        break;

      default:
        break;
    }
  }


  render() {
    // TabBar 默认配置
    const tabBarList = [
      { title: '商城', iconPrefixClass:'fa', iconType:'home' },
      { title: '促销', iconPrefixClass:'fa', iconType:'dollar' },
      { title: '钱包', iconPrefixClass:'fa', iconType:'credit-card' },
      { title: '订单', dot: true, iconPrefixClass:'fa', iconType:'reorder' },
      { title: '我的', iconPrefixClass:'fa', iconType:'user-o' }
    ]
    console.log(this.state['current'])
    // const taBarList = this.props['tabBarList'];
    return (
      <View>
        <AtTabBar
          fixed
          tabList={tabBarList}
          onClick={this.handleClick.bind(this)}
          current={this.state['current']}
        />
      </View>
    );
  }
}

export default TabBar;
