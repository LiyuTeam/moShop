/**
 * desc：  UserForm
 * author：Kevin
 * date：  2020/6/1
 **/
import Taro, { Component } from '@tarojs/taro';
import AtComponent from 'taro-ui/types/base';
import {View} from "@tarojs/components";
import { AtForm, AtInput, AtButton } from 'taro-ui'

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

    render() {
        const userData = this.props.userData;
        console.log(this.state['value']);
        return (
            <AtForm
              onSubmit={this.onSubmit.bind(this)}
              onReset={this.onReset.bind(this)}
            >
              {console.log(userData)}
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
              <AtButton type='primary' size='normal' formType='submit'>提交</AtButton>
              <AtButton formType='reset'>重置</AtButton>
            </AtForm>
        );
    }
}

export default UserForm;
