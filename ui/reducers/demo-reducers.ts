import { DemoState } from "./state";
import { INITIAL_STATE } from "./reducers";
import { DemoActionCreators, DemoAction } from "../actions/demo-actions";

export function DemoReducer(state: DemoState = INITIAL_STATE.demoState, action: DemoAction): DemoState {
  switch (action.type) {
    case DemoActionCreators.setError.type:
      return {
        ...state,
        error: action.payload,
      };
    case DemoActionCreators.setToken.type:
      return {
        ...state,
        token: action.payload,
      };
    case DemoActionCreators.querySmartDataStart.type:
      return {
        ...state,
        smartdata: null,
        smartdataLoading: true,
        error: null,
      }
    case DemoActionCreators.querySmartDataDone.type:
      return {
        ...state,
        smartdata: action.payload, smartdataLoading: false,
      }
    case DemoActionCreators.querySmartDataError.type:
      return {
        ...state,
        smartdata: null,
        smartdataLoading: false,
        error: action.payload,
      }
    case DemoActionCreators.resetSmartData.type:
      return {
        ...state,
        smartdata: null,
        smartdataLoading: false,
      }
    case DemoActionCreators.getSmartDataResidentialReportStart.type:
      return {
        ...state,
        getReportInProgress: true,
        getReportError: null,
      };
    case DemoActionCreators.getSmartDataResidentialReportError.type:
      return {
        ...state,
        getReportInProgress: false,
        getReportError: action.payload,
      };
    case DemoActionCreators.getSmartDataResidentialReportDone.type:
      return {
        ...state,
        getReportInProgress: false,
        getReportError: null,
      }
    default:
      return { ...state }
  }
}
