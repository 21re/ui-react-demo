import { ActionCreator } from "../helper/action-creator";
import { AxiosError } from "axios";
import { SmartdataResult } from "../models/smartdata";

export const DemoActionCreators = {
  setError: new ActionCreator<'SET_ERROR', AxiosError>('SET_ERROR'),
  setToken: new ActionCreator<'SET_TOKEN', string>('SET_TOKEN'),

  querySmartDataStart: new ActionCreator<'QUERY_SMARTDATA_START', undefined>('QUERY_SMARTDATA_START'),
  querySmartDataDone: new ActionCreator<'QUERY_SMARTDATA_DONE', SmartdataResult>('QUERY_SMARTDATA_DONE'),
  querySmartDataError: new ActionCreator<'QUERY_SMARTDATA_ERROR', AxiosError>('QUERY_SMARTDATA_ERROR'),

  resetSmartData: new ActionCreator<'RESET_SMARTDATA', undefined>('RESET_SMARTDATA'),

  getSmartDataResidentialReportStart: new ActionCreator<'GET_SMARTDATA_RESIDENTIAL_REPORT_START', undefined>('GET_SMARTDATA_RESIDENTIAL_REPORT_START'),
  getSmartDataResidentialReportDone: new ActionCreator<'GET_SMARTDATA_RESIDENTIAL_REPORT_DONE', undefined>('GET_SMARTDATA_RESIDENTIAL_REPORT_DONE'),
  getSmartDataResidentialReportError: new ActionCreator<'GET_SMARTDATA_RESIDENTIAL_REPORT_ERROR', AxiosError>('GET_SMARTDATA_RESIDENTIAL_REPORT_ERROR'),
};

export type DemoAction = typeof DemoActionCreators[keyof typeof DemoActionCreators];
