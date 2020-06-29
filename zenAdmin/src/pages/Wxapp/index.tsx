import React from 'react';
import TabsBasicLayout from './TabsBasicLayout';
import SettingPage from './components/Setting';
import { Layout } from 'antd';
import './index.less';
import { getClassnames } from '@/utils/utils';

const PageSymbol = Symbol('wxapp'),
  menuMap = [
    {
      key: 'wxapp-setting',
      title: 'wxapp.menu.setting',
      component: SettingPage,
    },
    // {
    //   key: 'wxapp-navigate',
    //   title: 'wxapp.menu.navigate',
    // },
  ];

const WxappPages = () => {
  return (
    <Layout.Content
      className={
        getClassnames(
          ['layout', 'content'],
          [PageSymbol.description ?? '', 'layout', 'content'],
        )}
    >
      <TabsBasicLayout menuMap={menuMap}/>
    </Layout.Content>
  );
};

export default WxappPages;
