import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import UserForm from '../../components/userForm/UserForm'

import './user.styl'

type PageStateProps = {
  counterStore: {
    counter: number
    increment: Function
    decrement: Function
    incrementAsync: Function
  }
}

interface User {
  props: PageStateProps
}

@inject('counterStore')
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
    navigationBarTitleText: '用户'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }

  render () {
    const userData = [
      {label: 'Name', field:'name', value:'Kevin'},
      {label: 'Nick Name', field:'nickname', value:'777'},
      {label: 'Email', field:'email', value:'kevincn.tang@outlook.com'},
      {label: 'Phone', field:'phone', value:'15011760892'}
    ]

    return (

      <View className='user'>
          <UserForm userData={userData}></UserForm>
      </View>
    )
  }
}

export default User as ComponentType
