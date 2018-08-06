
import { XLStoreState } from "./state";
import { INITIAL_STATE } from "./reducers";
import { XLStoreActionCreators, XLStoreAction } from "../actions/xlstore-actions";

export function XLStoreReducer(state: XLStoreState = INITIAL_STATE.xlstoreState, action: XLStoreAction): XLStoreState {
  switch (action.type) {
    case XLStoreActionCreators.getXLStoreAppsStart.type:
      return {
        ...state,
        loading: true,
      }
    case XLStoreActionCreators.getXLStoreAppsDone.type:
      return {
        ...state,
        loading: false,
        apps: action.payload,
      }
    case XLStoreActionCreators.getXLStoreAppsError.type:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case XLStoreActionCreators.getXLStoreAppDetailsDone.type:
      return {
        ...state,
        activeApp: action.payload,
        loading: false,
      }
    case XLStoreActionCreators.getXLStoreAppDetailsStart.type:
      return {
        ...state,
        loading: true,
        activeApp: null,
      }
    case XLStoreActionCreators.getXLStoreAppDetailsError.type:
      return {
        ...state,
        loading: false,
        error: action.payload,
        activeApp: null,
      }
    default:
      return state;
  }
}
