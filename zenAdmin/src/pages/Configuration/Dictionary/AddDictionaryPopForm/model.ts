import { ModalProps } from 'antd/es/modal';
import { Reducer } from 'react';

interface AddDictionaryPopFormStateType extends ModalProps {
  visible: boolean
}

interface AddDictionaryPopFormDVAType {
  namespace: string;
  state: AddDictionaryPopFormStateType;
  effects: object;
  reducers: {
    save: Reducer<AddDictionaryPopFormStateType, any>;
  }
}

const DVAModel:AddDictionary
