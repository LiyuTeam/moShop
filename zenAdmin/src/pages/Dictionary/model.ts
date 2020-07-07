import { Effect, Reducer } from 'umi';

import { DictionaryListType } from './data.d';
import { queryFakeList } from './service';
import { ModuleSymbol } from './index';
import { Logger } from '@/utils/utils';

const logger = Logger(`${ModuleSymbol}-model`);

export interface DictionaryPagesStateType {
  showAddForm: boolean;
  dictionaryList: DictionaryListType[];
}

export interface DictionaryDVAType {
  namespace: string;
  state: DictionaryPagesStateType;
  effects: {
    fetch: Effect;
    setShowAddForm: Effect;
    addDictionaryList: Effect;
  };
  reducers: {
    save: Reducer<DictionaryPagesStateType>;
    addItem: Reducer<DictionaryPagesStateType>;
  };
}

const Model: DictionaryDVAType = {
  namespace: ModuleSymbol,

  state: {
    dictionaryList: [],
    showAddForm: false,
  } as DictionaryPagesStateType,

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'save',
        payload: { dictionaryList: Array.isArray(response) ? response : [] },
      });
    },

    * setShowAddForm({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: { showAddForm: Boolean(payload) } as DictionaryPagesStateType,
      });
    },

    * addDictionaryList({ payload }, { call, put }) {
      yield  put({
        type: 'addItem',
        payload: payload,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      logger.log('reducers save', payload);
      return Object.assign({
        ...state,
      }, payload);
    },
    addItem: function(state, { payload }) {
      let dictList = state?.dictionaryList as [];
      logger.log('reducers addItem', payload, dictList);
      dictList.push(Object.assign(payload, { id: new Date().valueOf() }));
      return Object.assign(state, { dictionaryList: dictList });
    },
  },
};

export default Model;
