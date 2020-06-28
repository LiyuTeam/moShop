import React from 'react';
import TabsBasicLayout from './TabsBasicLayout';
import Settings from './Settings';

const menuMap = new Map();
menuMap.set('setting', {
  title: 'wxapp-setting',
  component: Settings()
});

const WxappPages: React.FC<{}> = () => {
  return (
    <>
      <TabsBasicLayout menuMap={menuMap} />
    </>
  );
};

export default WxappPages;
