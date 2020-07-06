import React from "react";
import styles from './index.less';
import DictionaryPage from "@/pages/Dictionary";
import {useLocation} from 'umi';

const subPageMap = new Map([
  ['default', () => <div/>],
  ['dictionary', () => <DictionaryPage/>]
])

export default () => {
  // const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const subPageKey = location.pathname.split('/').pop();

  return (
    <>
      {subPageMap.get(subPageKey ?? 'default')?.call(true)}
    </>
  );
};
