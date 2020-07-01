import { Effect, Reducer } from 'umi';

import { CardListItemDataType, DictionaryPageStateType } from './data.d';
import { queryFakeList } from './service';

export interface StateType {
  list: CardListItemDataType[];
  pageState: DictionaryPageStateType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    showAddForm:Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'configurationAndDictionary',

  state: {
    list: [],
    pageState: {
      addPopFormShow: false,
    },
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'save',
        payload: { list: Array.isArray(response) ? response : [] },
      });
    },

    * showAddForm({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: payload,
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
