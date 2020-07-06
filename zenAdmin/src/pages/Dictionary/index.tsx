import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Loading } from 'umi';
import { DictionaryPagesStateType } from './model';
import { DictionaryListType } from './data.d';
import styles from './style.less';
import AddDictionaryPopForm from './AddDictionaryPopForm';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { CurrentUser } from '@/pages/Modules/data';

export const ModuleSymbol = Symbol('Dictionary');

const
  { Paragraph } = Typography,
  DictionaryPage = () => {

    const
      dispatch = useDispatch(),
      { dictionaryList } = useSelector((state: { dictionary: DictionaryPagesStateType }) => state.dictionary),
      { loading } = useSelector((state: { loading: Loading }) => state.loading.models[ModuleSymbol.toString()]),
      nullData: Partial<DictionaryListType> = {},
      showAddFormAction = (isShow: boolean) => {
        dispatch({
          type: 'dictionary/showAddForm',
          payload: {
            showAddForm: isShow,
          } as DictionaryPagesStateType,
        });
      };

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
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
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
              } else {
                return '';
              }
            }}
          >
            <List.Item>
              <Button type="dashed" className={styles.newButton}
                      onClick={e => showAddFormAction(true)}>
                <PlusOutlined/> 新增产品
              </Button>
              <AddDictionaryPopForm/>
            </List.Item>
          </List>
        </div>
      </PageHeaderWrapper>
    );
  };

export default DictionaryPage;


