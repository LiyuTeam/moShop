import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message } from 'antd';
import { connect, useIntl, FormattedMessage } from 'umi';
import React from 'react';

import { CurrentUser } from '../data.d';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';
import styles from './BaseView.less';

const { Option } = Select;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>
      <FormattedMessage id="modules.basic.avatar" defaultMessage="Avatar"/>
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar"/>
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined/>
          <FormattedMessage id="modules.basic.change-avatar" defaultMessage="Change avatar"/>
        </Button>
      </div>
    </Upload>
  </>
);

interface SelectItem {
  label: string;
  key: string;
}

const validatorGeographic = (
  _: any,
  value: {
    province: SelectItem;
    city: SelectItem;
  },
  callback: (message?: string) => void,
) => {
  const { province, city } = value;
  if (!province.key) {
    callback('Please input your province!');
  }
  if (!city.key) {
    callback('Please input your city!');
  }
  callback();
};

const validatorPhone = (rule: any, value: string, callback: (message?: string) => void) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

interface BaseViewProps {
  currentUser?: CurrentUser;
}

const BaseView = (props: BaseViewProps) => {

  let view: HTMLDivElement | undefined;

  const getAvatarURL = () => {
    const { currentUser } = props;
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };

  const getViewDom = (ref: HTMLDivElement) => {
    view = ref;
  };

  const handleFinish = () => {
    message.success(useIntl().formatMessage({ id: 'modules.basic.update.success' }));
  };

  const { currentUser } = props,
    intl = useIntl();

  return (
    <div className={styles.baseView} ref={getViewDom}>
      <div className={styles.left}>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={currentUser}
          hideRequiredMark
        >
          <Form.Item
            name="email"
            label={intl.formatMessage({ id: 'modules.basic.email' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'modules.basic.email-message' }, {}),
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="name"
            label={intl.formatMessage({ id: 'modules.basic.nickname' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'modules.basic.nickname-message' }, {}),
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="profile"
            label={intl.formatMessage({ id: 'modules.basic.profile' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'modules.basic.profile-message' }, {}),
              },
            ]}
          >
            <Input.TextArea
              placeholder={intl.formatMessage({ id: 'modules.basic.profile-placeholder' })}
              rows={4}
            />
          </Form.Item>
          <Form.Item
            name="country"
            label={intl.formatMessage({ id: 'modules.basic.country' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'modules.basic.country-message' }, {}),
              },
            ]}
          >
            <Select style={{ maxWidth: 220 }}>
              <Option value="China">中国</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="geographic"
            label={intl.formatMessage({ id: 'modules.basic.geographic' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'modules.basic.geographic-message' }, {}),
              },
              {
                validator: validatorGeographic,
              },
            ]}
          >
            <GeographicView/>
          </Form.Item>
          <Form.Item
            name="address"
            label={intl.formatMessage({ id: 'modules.basic.address' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'modules.basic.address-message' }, {}),
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="phone"
            label={intl.formatMessage({ id: 'modules.basic.phone' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'modules.basic.phone-message' }, {}),
              },
              { validator: validatorPhone },
            ]}
          >
            <PhoneView/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              <FormattedMessage
                id="modules.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
        <AvatarView avatar={getAvatarURL()}/>
      </div>
    </div>
  );
};

export default connect(
  ({ modules }: { modules: { currentUser: CurrentUser } }) => ({
    currentUser: modules.currentUser,
  }),
)(BaseView);
