import {ComponentType} from 'react'
import Taro, {Component, Config} from '@tarojs/taro'
import {View, Swiper, SwiperItem} from '@tarojs/components'
import {observer, inject} from '@tarojs/mobx'
import {AtIcon, AtAvatar, AtBadge} from 'taro-ui'
import ProductListNormal from '../../components/productList/Normal'

import './shop.styl'
import Picture from "../../components/picture/Picture";
import TabBar from "../../components/tabBar/TabBar";


type PageStateProps = {
  counterStore: {
    counter: number
    increment: Function
    decrement: Function
    incrementAsync: Function
  }
}

interface Shop {
  props: PageStateProps
}

export type ProductDataImpl = {
  itemId: string
  itemThumb?: string
  price?: number | null
  originPrice?: number
  status: 'active' | 'inactive'
  title: string
  labels?: string[]
}

@inject('counterStore')
@observer
class Shop extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() {
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  increment = () => {
    const {counterStore} = this.props
    counterStore.increment()
  }

  decrement = () => {
    const {counterStore} = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const {counterStore} = this.props
    counterStore.incrementAsync()
  }

  constructor(props) {
    super(props);
  }

  render() {
    const testImg = 'https://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=https%3A%2F%2Ftimgsa.baidu.com%2Ftimg%3Fimage%26quality%3D80%26size%3Db9999_10000%26sec%3D1590440638913%26di%3Db9a7aeca1ea86570c459e7a2775b0063%26imgtype%3D0%26src%3Dhttp%253A%252F%252Fn1.itc.cn%252Fimg8%252Fwb%252Fsmccloud%252Frecom%252F2015%252F11%252F05%252F144670339594709418.JPEG&thumburl=https%3A%2F%2Fss1.bdstatic.com%2F70cFvXSh_Q1YnxGkpoWK1HF6hhy%2Fit%2Fu%3D3152169011%2C1792675578%26fm%3D26%26gp%3D0.jpg'
    const productData: ProductDataImpl = {
      title: "我是标题",
      itemId: Math.random() * 100000 + '',
      itemThumb: testImg,
      price: 99,
      originPrice: 199.50,
      status: "active",
      labels: ['b1f1', '50%off']
    }
    const swiperItems: ProductDataImpl[] = [productData, productData, productData, productData, productData]
    const newUsers = '随,机,选,其,一,些,用,户'.split(',')

    // const {counterStore: {counter}} = this.props
    return (
      <View className='shop'>
        {/* 轮播图*/}
        <Swiper
          circular
          indicatorDots
          autoplay
        >
          {swiperItems.map((item, index) => (
            <SwiperItem>
              <Picture
                key={index}
                src={item.itemThumb}
                width='100%'
              />
            </SwiperItem>
          ))}
        </Swiper>
        {/*最近浏览用户栏*/}
        <View className='at-row'>
          <View className='at-col'>
            <AtBadge value={newUsers.length || 0}>
              <AtIcon
                value='streaming'
                size='40'
                color='#333'
              >
              </AtIcon>
            </AtBadge>
          </View>
          {newUsers.map((user, index) => (
            <AtAvatar
              key={index}
              size='small'
              circle
              text={user}
            >
            </AtAvatar>
          ))}
        </View>
        <View>
          <ProductListNormal products={swiperItems}></ProductListNormal>
        </View>
        <TabBar tabBarData={[]} />
      </View>
    )
  }
}

export default Shop as ComponentType
