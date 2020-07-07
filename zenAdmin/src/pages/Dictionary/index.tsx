import React, { useEffect, } from 'react';
import { Loading } from 'umi';
import { Button, Card, List, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';

import { DictionaryListType } from './data.d';
import AddDictionaryPopForm from './AddDictionaryPopForm';
import styles from './style.less';
import { Logger } from '@/utils/utils';

export const ModuleSymbol = 'Dictionary';

const
  { Paragraph } = Typography,
  logger = Logger(ModuleSymbol),
  DictionaryPage = () => {

    const
      dispatch = useDispatch(),
      dictionaryList = useSelector(state => state[ModuleSymbol].dictionaryList),
      loadingEffect = useSelector((state: { loading: Loading }) => state.loading),
      loading = loadingEffect.effects[ModuleSymbol],
      nullData: Partial<DictionaryListType> = {},
      showAddFormAction = (isShow: boolean) => dispatch({
        type: `${ModuleSymbol}/setShowAddForm`,
        payload: isShow,
      });

    // let
    //   [dictList, setDictList] = useState(dictionaryList);

    useEffect(() => {
      logger.log('component update effect', dictionaryList);
      dispatch({
        type: `${ModuleSymbol}/fetch`,
        payload: '',
      });
      // setDictList(dictionaryList);
    }, []);

    // useEffect(() => {
    //   logger.log('dictList Update effect', dictList);
    // }, [dictionaryList]);

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>数据字典</p>
      </div>
    );

    return (
      <PageHeaderWrapper content={content}>
        <div className={styles.cardList}>
          <List<Partial<DictionaryListType>>
            rowKey="id"
            loading={loading}
            grid={{ gutter: 16, xs: 2, sm: 4, md: 4, lg: 6, xl: 6, xxl: 6 }}
            dataSource={[nullData, ...dictionaryList]}
            renderItem={(item: Partial<DictionaryListType>) => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      className={styles.card}
                      actions={[<a key="option1">操作一</a>, <a key="option2">操作二</a>]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar}/>}
                        title={<a>{item.title}</a>}
                        description={
                          <Paragraph
                            className={styles.item}
                            ellipsis={{
                              rows: 3,
                            }}
                          >
                            {item.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}
                          onClick={e => showAddFormAction(true)}>
                    <PlusOutlined/> 新增字典
                  </Button>
                  <AddDictionaryPopForm/>
                </List.Item>
              );

            }}
          >
          </List>
        </div>
      </PageHeaderWrapper>
    );
  };

export default DictionaryPage;


