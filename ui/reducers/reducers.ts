import { State } from "./state";
import { combineReducers } from "redux";
import { DemoReducer } from "./demo-reducers";
import { XLStoreReducer } from "./xlstore-reducer";
import { navigationReducer } from "./navigation-reducers";

export const INITIAL_STATE: State = {
  demoState: {
    error: null,
    token: null,
    smartdata: null,
    getReportError: null,
    getReportInProgress: false,
    smartdataLoading: false,
    valuationInProgress: false,
    valuationResult: null,
  },
  xlstoreState: {
    activeApp: null,
    loading: false,
    apps: [],
    error: null,
    calculation: {
      error: null,
      loading: false,
      result: null,
    },
  },
  navigation: {
    currentPage: null,
  },
};

export const reducers = combineReducers<State>({
  demoState: DemoReducer,
  xlstoreState: XLStoreReducer,
  navigation: navigationReducer,
});
