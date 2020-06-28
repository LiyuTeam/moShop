import React from "react";
import styles from "./index.less";
import {Tabs} from "antd";

const {TabPane} = Tabs;

function callback(key) {
  console.log(key);
}

export default (props: {
  menuMap?: Map<any, any>
}) => {
  const {menuMap} = props;
  console.log(props.menuMap)
  return (
    <div className={styles.container}>
      <div id="components-tabs-demo-basic">
        <Tabs defaultActiveKey="1" onChange={callback} tabPosition='left'>
          <div>
            {[menuMap?.forEach((
              v: { title?: string, component?: any },k
              ) => (
                <TabPane tab={`Tab${v?.title}`} key={k}>{v?.component}</TabPane>
              )
            )]}
          </div>
        </Tabs>
      </div>
    </div>
  );
};
