import { Effect, Reducer } from 'umi';

import { DictionaryListType } from './data.d';
import { queryFakeList } from './service';
import { ModuleSymbol } from './index';

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
  };
  reducers: {
    save: Reducer<DictionaryPagesStateType>;
  };
}

const Model: DictionaryDVAType = {
  namespace: ModuleSymbol.toString(),

  state: {
    dictionaryList: [],
    showAddForm: false,
  } as DictionaryPagesStateType,

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'save',
        payload: { list: Array.isArray(response) ? response : [] },
      });
    },

    * setShowAddForm({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: { showAddForm: Boolean(payload) } as DictionaryPagesStateType,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return Object.assign({
        ...state,
      }, payload);
    },
  },
};

export default Model;
