/**
 * desc：  TabBar
 * author：Kevin
 * date：  2020/6/4
 **/
import Taro, { Component } from '@tarojs/taro';
import { View } from "@tarojs/components";
import { AtTabBar } from 'taro-ui'
import {inject, observer} from "@tarojs/mobx";


import './TabBar.styl';


type TabBarStateProps = {
  tabBarStore: any[]
  currentPage: number
}

interface TabBar {
  props: TabBarStateProps
}

@inject('tabBarStore')
@observer
class TabBar extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.tabBarStore)
  }

  handleClick (value) {
    // 重定向到对应的TAB
    Taro.redirectTo({
      url: this.props.tabBarStore[value]['path']
    }).then(r =>{
      // 打印当前跳转结果
      console.log(r)
    }).catch((error) => {
      console.log(error);
      /* TODO 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 */
      // wx.switchTab({url: '/pages/index/index'})
    })
  }


  render() {
    // console.log(this.props['currentPage'])
    // TabBar 默认配置
    const tabBarList = this.props.tabBarStore.slice()
    return (
      <View>
        <AtTabBar
          fixed
          tabList={tabBarList}
          onClick={this.handleClick.bind(this)}
          current={this.props['currentPage']}
        />
      </View>
    );
  }
}

export default TabBar;
