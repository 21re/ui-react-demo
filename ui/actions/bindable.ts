import { Dispatch } from "redux";
import { State } from "../reducers/state";
import { bindBindableActions } from "../helper/minithunk";
import { calculateRentIndex, getRentIndex, getRentIndexList, calculateXLStoreApp, openXLStoreApp, navigateTo, getXLStoreApps, getSmartDataResidentialReport, navigateHome, navigateCalculate, resetSmartData, registerToken, checkToken, querySmartData, valuate, resetValuate } from "./demo";
import { Address } from "../models/address";
import { NavigationPage } from "./navigation";
import { ValuationRequest } from "../models/valuate";
import { XLCalculationRequest } from "../models/xlstore";
import { QuestionCatalogRequest } from "../models/rentindex";

export type BoundActions = {
  checkToken: (token: string) => void,
  registerToken: (token: string) => void,
  navigateTo: (navigationPage: NavigationPage, params?: any) => void,
  querySmartData: (address: Address) => void,
  resetSmartData: () => void,
  resetValuate: () => void,
  getSmartDataResidentialReport: (address: Address) => void,
  navigateHome: (token: string) => void,
  navigateCalculate: () => void,
  getXLStoreApps: () => void,
  openXLStoreApp: (id: string) => void,
  calculateXLStoreApp: (id: string, request: XLCalculationRequest) => void
  valuate: (request: ValuationRequest) => void,
  getRentIndexList: () => void,
  getRentIndex: (city: string, year: number) => void
  calculateRentIndex: (city: string, year: number, request: QuestionCatalogRequest) => void
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
    openXLStoreApp,
    calculateXLStoreApp,
    valuate,
    resetValuate,
    getRentIndexList,
    getRentIndex,
    calculateRentIndex,
  });
}
