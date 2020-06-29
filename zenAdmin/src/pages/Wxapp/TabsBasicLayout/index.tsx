import React, { useEffect } from 'react';
import styles from './index.less';
import { Tabs } from 'antd';
import { useIntl, history } from 'umi';

const { TabPane } = Tabs;

export default (props: {
  menuMap?: { key: string, title?: string, component?: any }[]
}) => {
  const { menuMap } = props,
    intl = useIntl(),
    fm = (str: string) => intl.formatMessage({ id: str });

  useEffect(() => {
    if (!history.location.hash) {
      history.push(
        Object.assign({}, history.location, {
          hash:
          props.menuMap[0].key,
        }),
      );
    }
  }, []);

  return (
    <div className={styles.container}>
      <p>{history.location.hash}</p>
      <Tabs
        onChange={key => history.push(Object.assign({}, history.location, { hash: key }))}
        tabPosition='left'>
        {menuMap?.map(menu => {
            return (
              <TabPane
                tab={fm(menu.title ?? '')}
                key={menu.key}
              >{menu?.component() ?? ''}</TabPane>
            );
          },
        )}
      </Tabs>
    </div>
  );
};
