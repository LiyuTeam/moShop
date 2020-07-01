import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography } from 'antd';
import React, {  useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { StateType } from './model';
import { CardListItemDataType } from './data.d';
import styles from './style.less';
import AddDictionaryPopForm from './AddDictionaryPopForm';

const { Paragraph } = Typography;

interface DictionaryProps {
  configurationAndDictionary: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

interface DictionaryState {
  visible: boolean;
  done: boolean;
  current?: Partial<CardListItemDataType>;
}

const Dictionary = (props: Partial<DictionaryProps>, state: Partial<DictionaryState>) => {

  const { dispatch } = props;

  // dispatch({
  //   type: 'configurationAndDictionary/fetch',
  //   payload: {
  //     count: 8,
  //   },
  // });

  const showAddPopForm = (isShow: boolean) => {
    dispatch({
      type: 'configurationAndDictionary/showAddForm',
      payload: {
        pageState: { addPopFormShow: isShow },
      } as StateType,
    });
  };

  const {
    configurationAndDictionary: { list },
    loading,
  } = props;

  const content = (
    <div className={styles.pageHeaderContent}>
      <p>数据字典</p>
    </div>
  );

  const nullData: Partial<CardListItemDataType> = {};

  return (
    <PageHeaderWrapper content={content}>
      <div className={styles.cardList}>
        <List<Partial<CardListItemDataType>>
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
          dataSource={[nullData, ...list]}
          renderItem={item => {
            if (item && item.id) {
              return (
                <List.Item key={item.id}>
                  <Card
                    hoverable
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
          }}
        >
          <List.Item>
            <Button type="dashed" className={styles.newButton}
                    onClick={showAddPopForm(true)}>
              <PlusOutlined/> 新增产品
            </Button>
            <AddDictionaryPopForm />
          </List.Item>
        </List>
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
     configurationAndDictionary,
     loading,
   }: {
    configurationAndDictionary: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    configurationAndDictionary,
    loading: loading.models.configurationAndDictionary,
  }),
)(Dictionary);
