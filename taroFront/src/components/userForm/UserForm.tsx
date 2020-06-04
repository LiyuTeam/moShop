/**
 * desc：  UserForm
 * author：Kevin
 * date：  2020/6/1
 **/
import "taro-ui/dist/style/components/nav-bar.scss";
import "taro-ui/dist/style/components/icon.scss";
import Taro, { Component } from '@tarojs/taro';
import AtComponent from 'taro-ui/types/base';
import {View} from "@tarojs/components";
import { AtForm, AtInput, AtNavBar } from 'taro-ui'
import TabBar from '../tabBar/TabBar'

import './UserForm.styl';

export interface UserFormProps extends AtComponent {
  /**
   * @default [] * 用户信息
   */
  userData: any[]
}

class UserForm extends Component<UserFormProps> {


    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            value: ''
        };
    }

    handleChange (value) {
        this.setState({
            value
        });
    }
    onSubmit (event) {
        console.log(event);
    }
    onReset (event) {
      console.log(event)
      this.setState({
        value: ''
      });
    }
    handleClick(){
        console.log('click')
    }
    render() {
      console.log(this.state['value'])
      const userData = this.props.userData;
      return (
        <View>
          <AtNavBar
            onClickRgIconSt={this.handleClick}
            onClickRgIconNd={this.handleClick}
            onClickLeftIcon={this.handleClick}
            color='#000'
            leftText='返回'
            rightFirstIconType='check'
          >
            <View>用户信息</View>
          </AtNavBar>
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
            onReset={this.onReset.bind(this)}
          >
            <View>
              {userData.map((item) => (
                <AtInput
                  name={item['field']}
                  title={item['label']}
                  type='text'

                  placeholder='单行文本'
                  value={item['value']}
                  onChange={this.handleChange.bind(this, item['value'])}
                />
              ))}
            </View>
            {/*<AtButton type='primary' size='normal' formType='submit'>提交</AtButton>*/}
            {/*<AtButton formType='reset'>重置</AtButton>*/}
          </AtForm>
          <TabBar tabBarData={[]} />
        </View>
      );
    }
}

export default UserForm;
