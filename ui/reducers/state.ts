import { NavigationPage } from "../actions/navigation";
import { AxiosError } from "axios";
import { SmartdataResult } from "../models/smartdata";
import { XLStoreApp, XLStoreAppDetails } from "../models/calculation";

export interface DemoState {
  error: AxiosError | null
  token: string | null
  smartdata: SmartdataResult | null
  getReportError: AxiosError | null
  getReportInProgress: boolean
  smartdataLoading: boolean
}

export interface NavigationState {
  currentPage: NavigationPage | null,
}

export interface State {
  demoState: DemoState
  xlstoreState: XLStoreState
  navigation: NavigationState
}

export interface XLStoreState {
  loading: boolean
  apps: XLStoreApp[]
  activeApp: XLStoreAppDetails | null
  error: AxiosError | null
}
