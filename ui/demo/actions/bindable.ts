import { Dispatch } from "redux";
import { State } from "../reducers/state";
import { bindBindableActions } from "../helper/minithunk";
import { openXLApp, navigateTo, getXLStoreApps, getSmartDataResidentialReport, navigateHome, navigateCalculate, resetSmartData, registerToken, checkToken, querySmartData } from "./demo";
import { Address } from "../models/address";
import { NavigationPage } from "./navigation";

export type BoundActions = {
  checkToken: (token: string) => void,
  registerToken: (token: string) => void,
  navigateTo: (navigationPage: NavigationPage, params?: any) => void,
  querySmartData: (address: Address) => void,
  resetSmartData: () => void,
  getSmartDataResidentialReport: (address: Address) => void,
  navigateHome: (token: string) => void,
  navigateCalculate: () => void,
  getXLStoreApps: () => void,
  openXLApp: (id: string) => void,
}

export function actionBinder(dispatch: Dispatch<State>): BoundActions {
  return bindBindableActions<State, BoundActions>(dispatch, {
    checkToken,
    registerToken,
    navigateTo,
    querySmartData,
    resetSmartData,
    getSmartDataResidentialReport,
    navigateHome,
    navigateCalculate,
    getXLStoreApps,
    openXLApp,
  });
}
