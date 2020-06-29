import {PageContainer, PageHeaderWrapper} from '@ant-design/pro-layout';
import React, {useState, useEffect} from 'react';
import {Spin} from 'antd';
import styles from './index.less';
import {getClassnames} from "@/utils/utils";

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageContainer
    className={getClassnames(
      ['layout','context']
    )}>
      1
    </PageContainer>
  );
};
