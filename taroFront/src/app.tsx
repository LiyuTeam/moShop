import Taro, {Component, Config} from '@tarojs/taro'
import {Provider} from '@tarojs/mobx'
import Index from './pages/index'


import counterStore from './store/counter'
import tabBarStore from './store/tabbar'
import './app.styl'
// eslint-disable-next-line import/first
import 'taro-ui/dist/style/index.scss'
// eslint-disable-next-line import/first
import "taro-ui/dist/style/components/button.scss";
// eslint-disable-next-line import/first
import "taro-ui/dist/style/components/loading.scss";
// eslint-disable-next-line import/first
import "./assets/font-awesome/scss/font-awesome.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore,
  tabBarStore
}

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/shop/shop',
      'pages/promotion/promotion',
      'pages/wallet/wallet',
      'pages/order/order',
      'pages/index/index',
      'pages/user/user'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
    // TODO 注释配置的tabbar，使用自定义tabbar
    // tabBar: {
    //   list: [
    //     {text: '商城',pagePath:'pages/shop/shop'},
    //     {text: '促销',pagePath:'pages/index/index'},
    //     {text: '钱包',pagePath:'pages/index/index'},
    //     {text: '订单',pagePath:'pages/index/index'},
    //     {text: '我',pagePath:'pages/user/user', iconPath: "./assets/tab-bar/user.png", selectedIconPath: "./assets/tab-bar/user-active.png"}
    //   ]
    // }
  }

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
