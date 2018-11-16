import { NavigationPage } from "../actions/navigation";
import { AxiosError } from "axios";
import { SmartdataResult } from "../models/smartdata";
import { XLStoreApp, XLStoreAppDetails, XLCalculationResult } from "../models/xlstore";
import { ValuationResult } from "../models/valuate";
import { RentIndexList, RentIndex, RentResult } from "../models/rentindex";

export interface DemoState {
  error: AxiosError | null
  token: string | null
  smartdata: SmartdataResult | null
  getReportError: AxiosError | null
  getReportInProgress: boolean
  smartdataLoading: boolean
  valuationResult: ValuationResult | null
  valuationInProgress: boolean
}

export interface RentIndexState {
  rentIndexList: RentIndexList
  rentIndex: RentIndex | null
  result: RentResult | null
  loading: boolean
  error: AxiosError | null
}

export interface NavigationState {
  currentPage: NavigationPage | null,
}

export interface State {
  demoState: DemoState
  xlstoreState: XLStoreState
  navigation: NavigationState
  rentIndexState: RentIndexState
}

export interface XLStoreState {
  loading: boolean
  apps: XLStoreApp[]
  activeApp: XLStoreAppDetails | null
  calculation: CalculationState
  error: AxiosError | null
}

export interface CalculationState {
  error: AxiosError | null
  loading: boolean
  result: XLCalculationResult | null
}
