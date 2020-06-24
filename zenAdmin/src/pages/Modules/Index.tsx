import React, { Component } from 'react';

import { FormattedMessage, Dispatch, connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Button, Col, Menu, Row, Space } from 'antd';
import BaseView from './components/base';
import BindingView from './components/binding';
import { CurrentUser } from './data.d';
import NotificationView from './components/notification';
import SecurityView from './components/security';
import UnitsView from './components/UnitsView';
import DevToolView from './components/DevToolView';

import styles from './style.less';
import { SettingOutlined } from '@ant-design/icons/lib';

const { Item } = Menu;

interface ModulesProps {
  dispatch: Dispatch;
  currentUser: CurrentUser;
}

type ModulesStateKeys = 'base' | 'security' | 'binding' | 'notification';

interface ModulesState {
  mode: 'inline' | 'horizontal';
  menuMap: {
    [key: string]: React.ReactNode;
  };
  selectKey: ModulesStateKeys;
}

class Modules extends Component<ModulesProps,
  ModulesState> {
  main: HTMLDivElement | undefined = undefined;

  constructor(props: ModulesProps) {
    super(props);
    const menuMap = {
      devtool: <FormattedMessage id="modules.menuMap.devtool" defaultMessage="DevTool"/>,
      units: <FormattedMessage id="modules.menuMap.units" defaultMessage="Units"/>,
      base: <FormattedMessage id="modules.menuMap.basic" defaultMessage="Basic Settings"/>,
      security: (
        <FormattedMessage id="modules.menuMap.security" defaultMessage="Security Settings"/>
      ),
      binding: (
        <FormattedMessage id="modules.menuMap.binding" defaultMessage="Account Binding"/>
      ),
      notification: (
        <FormattedMessage
          id="modules.menuMap.notification"
          defaultMessage="New Message Notification"
        />
      ),
    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'base',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'modules/fetchCurrent',
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = (key: ModulesStateKeys) => {
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;
    if (selectKey === 'base') {
      return <BaseView/>;
    }
    if (selectKey === 'security') {
      return <SecurityView/>;
    }
    if (selectKey === 'binding') {
      return <BindingView/>;
    }
    if (selectKey === 'notification') {
      return <NotificationView/>;
    }
    if (selectKey === 'units') {
      return <UnitsView/>;
    }
    if (selectKey === 'devtool') {
      return <DevToolView/>;
    }

    return null;
  };

  render() {
    const { currentUser } = this.props;
    if (!currentUser.userid) {
      return '';
    }
    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={(ref) => {
            if (ref) {
              this.main = ref;
            }
          }}
        >
          <div className={styles.leftMenu}>
            <Row>
              <Col flex='2em'/>
              <Col flex='auto'>
                <Button
                  type="dashed"
                  shape="circle"
                  icon={<SettingOutlined/>}/>
              </Col>
            </Row>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={({ key }) => this.selectKey(key as ModulesStateKeys)}
            >
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {this.renderChildren()}
          </div>
        </div>
      </GridContent>
    );
  }
}


export default connect(
  ({ modules }: { modules: { currentUser: CurrentUser } }) => ({
    currentUser: modules.currentUser,
  }),
)(Modules);
