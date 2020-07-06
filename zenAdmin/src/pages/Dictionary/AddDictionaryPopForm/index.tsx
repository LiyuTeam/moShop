import styles from './index.less';
import React from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { DictionaryPagesStateType } from '@/pages/Dictionary/model';

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

  let isShow = useSelector((state: { dictionary: DictionaryPagesStateType }) => {
      console.log(state);
      return state.dictionary.showAddForm;
    }),
    dispatch = useDispatch();

  const switchSelfShow = (_isShow: boolean) => dispatch({
    type: 'configurationAndDictionary/showAddForm',
    payload: {
      showAddForm: _isShow,
    } as DictionaryPagesStateType,
  });


  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    switchSelfShow(false);
  };
  return (
    <div className={styles.container}>
      <div id="components-form-demo-form-in-modal">
        <div>
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

export default AddDictionaryPopForm;
