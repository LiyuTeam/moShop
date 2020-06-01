/**
 * desc：  userForm
 * author：Kevin
 * date：  2020/6/1
 **/
import Taro, {Component} from "@tarojs/taro"
import AtComponent from "taro-ui/types/base";
import {AtCard} from "taro-ui"
import {View,Form,Switch} from "@tarojs/components"

import './userForm.styl'
import Picture from "../picture/picture";

export interface userFormProps extends AtComponent {
  /**
   * @default {} * 用户信息
   */
  userData: object{}
}

class userForm extends Component<userFormProps> {

  constructor(props) {
    super(props);
    console.log(props)
  }

  formSubmit = e => {
    console.log(e)
  }

  formReset = e => {
    console.log(e)
  }

  render() {
    const userData = this.props.userData;
    return (
      <Form onSubmit={this.formSubmit} onReset={this.formReset} >
        <View className={className}>
          <Switch name='switch' className='form-switch'></Switch>
        </View>
      </Form>
    )
  }
}

export default userForm
