import styles from './index.less';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import { connect, useDispatch, useSelector } from '@@/plugin-dva/exports';
import { DictionaryDVAType, StateType } from '@/pages/Configuration/Dictionary/model';
import { Dispatch } from '@@/plugin-dva/connect';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
                                                                     visible,
                                                                     onCreate,
                                                                     onCancel,
                                                                   }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea"/>
        </Form.Item>
        <Form.Item
          name="modifier"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddDictionaryPopForm = () => {

  // const { configurationAndDictionary, dispatch } = props;
  // let isShow = configurationAndDictionary.pageState.addPopFormShow ?? false;

  let isShow = useSelector((state) => {
      console.log(state);
      return state[`${setting.configName}`]?.pageState?.addPopFormShow ?? false;
    }),
    dispatch = useDispatch();

  const switchSelfShow = (_isShow: boolean) => dispatch({
    type: 'configurationAndDictionary/showAddForm',
    payload: {
      pageState: { addPopFormShow: _isShow },
    } as StateType,
  });


  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    switchSelfShow(false);
  };
  return (
    <div className={styles.container}>
      <div id="components-form-demo-form-in-modal">
        <div>
          <Button
            type="primary"
            onClick={() => {
              switchSelfShow(true);
            }}
          >
            New Collection
          </Button>
          <CollectionCreateForm
            visible={isShow}
            onCreate={onCreate}
            onCancel={() => {
              switchSelfShow(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

// export default connect(
//   ({
//      configurationAndDictionary,
//    }: {
//     configurationAndDictionary: StateType,
//   }) => ({
//     configurationAndDictionary,
//   }),
// )(AddDictionaryPopForm);
export default AddDictionaryPopForm;
