import { RentIndexState } from "./state";
import { INITIAL_STATE } from "./reducers";
import { DemoActionCreators, DemoAction } from "../actions/demo-actions";


export function RentIndexReducer(state: RentIndexState = INITIAL_STATE.rentIndexState, action: DemoAction): RentIndexState {
  switch (action.type) {
    case DemoActionCreators.getRentIndexListStart.type:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case DemoActionCreators.getRentIndexListDone.type:
      return {
        ...state,
        loading: false,
        error: null,
        rentIndexList: action.payload,
      }
    case DemoActionCreators.getRentIndexListError.type:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case DemoActionCreators.getRentIndexStart.type:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case DemoActionCreators.getRentIndexDone.type:
      return {
        ...state,
        loading: false,
        error: null,
        rentIndex: action.payload,
      }
    case DemoActionCreators.getRentIndexError.type:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case DemoActionCreators.getRentCalculateDone.type:
      return {
        ...state,
        loading: false,
        error: null,
        result: action.payload,
      }
    case DemoActionCreators.getRentCalculateStart.type:
      return {
        ...state,
        loading: true,
        error: null,
        result: null,
      }
    case DemoActionCreators.getRentCalculateError.type: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        result: null,
      }
    }
    default:
      return state
  }
}
