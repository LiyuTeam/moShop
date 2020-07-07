import styles from './index.less';
import React from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { useDispatch, useSelector } from '@@/plugin-dva/exports';
import { DictionaryPagesStateType } from '@/pages/Dictionary/model';
import { ModuleSymbol } from '../index';
import { dictionaryFieldsType } from '@/pages/Dictionary/AddDictionaryPopForm/data';

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: dictionaryFieldsType) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> =
  ({
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
              onCreate(values as dictionaryFieldsType);
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

  let { showAddForm } = useSelector(state => state[ModuleSymbol] as DictionaryPagesStateType),
    dispatch = useDispatch();

  const
    switchShowAction = async (_isShow: boolean) => await dispatch({
      type: `${ModuleSymbol}/setShowAddForm`,
      payload: _isShow,
    }),
    updateDictionaryListAction = async (item: any) => await dispatch({
      type: `${ModuleSymbol}/addDictionaryList`,
      payload: item,
    });


  const onCreate = async (values: any) => {
    console.log('Received values of form: ', values);
    await updateDictionaryListAction(values);
    await switchShowAction(false);
  };
  return (
    <div className={styles.container}>
      <CollectionCreateForm
        visible={showAddForm}
        onCreate={onCreate}
        onCancel={async () => await switchShowAction(false)}
      />
    </div>
  );
};

export default AddDictionaryPopForm;
