import React, { useState } from 'react';
import { connect } from '@@/plugin-dva/exports';
import { CurrentUser } from '@/pages/Modules/data';
import { Button, Drawer, Form, Space, Radio, Input } from 'antd';
import { AlignCenterOutlined, FileImageOutlined } from '@ant-design/icons/lib';
import apolloClient from '@/libs/apollo-graphql';
import { useQuery } from '@apollo/react-hooks';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

interface BaseViewProps {
  currentUser?: CurrentUser
}

interface UnitsAddViewProps {
  isShow: boolean,
  onClose: any,
}

const UnitsView = (props: BaseViewProps): JSX.Element => {
  let [isShow, setShow] = useState(false);
  return <>
    {/* 工具栏 */}
    <div>
      <Space><Button onClick={e => setShow(true)}> + New Unit</Button></Space>
    </div>
    <div>
      <UnitsAddView
        isShow={isShow}
        onClose={setShow}
      />
    </div>
  </>;
};

let unitsTypes = {
  text: {
    key: null, title: null, type: 'text', description: null, icon: <AlignCenterOutlined/>,
  },
  img: {
    key: null, title: null, type: 'img', src: null, description: null, icon: <FileImageOutlined/>,
  },
};

const QueryRates = () => {
  const { loading, error, data } = useQuery(gql`
    {
      rates(currency: "USD") {
        currency
        rate
      }
    }
  `);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}:<Input placeholder="Basic usage" value={rate} />
      </p>
    </div>
  ));
};


const UnitsAddView = ({ isShow, onClose }: UnitsAddViewProps): JSX.Element => {

  const onCloseThis = () => {
    onClose(false);
  };


  let [newUnitForm] = Form.useForm();
  return (
    <>
      <Drawer
        width={720}
        title="New Unit"
        placement="right"
        closable={true}
        visible={isShow}
        onClose={onCloseThis}>
        {/*  表单 */}
        <Form
          form={newUnitForm}
          layout="vertical"
          name="form_new_unit"
        >
          <Form.Item name="type" label="Types" rules={[{ required: true }]}>
            <Radio.Group defaultValue={null} buttonStyle="solid" size="large">
              {Object.entries(unitsTypes).map(([uk, uv]) => {
                  return (
                    <Radio.Button value={uk}>
                      {uv.icon} {uk}
                    </Radio.Button>
                  );
                },
              )}
            </Radio.Group>
          </Form.Item>
          <ApolloProvider client={apolloClient}>
            <p>1</p>
            <QueryRates/>
          </ApolloProvider>
        </Form>
      </Drawer>
    </>
  );
};

export default connect(
  ({ modules }: { modules: { currentUser: CurrentUser } }) => ({
    currentUser: modules.currentUser,
  }),
)(UnitsView);
