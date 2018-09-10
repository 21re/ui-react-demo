import { ActionCreator } from "../helper/action-creator";
import { AxiosError } from "axios";
import { SmartdataResult } from "../models/smartdata";
import { ValuationResult } from "../models/valuate";

export const DemoActionCreators = {
  setError: new ActionCreator<'SET_ERROR', AxiosError>('SET_ERROR'),
  setToken: new ActionCreator<'SET_TOKEN', string>('SET_TOKEN'),

  querySmartDataStart: new ActionCreator<'QUERY_SMARTDATA_START', undefined>('QUERY_SMARTDATA_START'),
  querySmartDataDone: new ActionCreator<'QUERY_SMARTDATA_DONE', SmartdataResult>('QUERY_SMARTDATA_DONE'),
  querySmartDataError: new ActionCreator<'QUERY_SMARTDATA_ERROR', AxiosError>('QUERY_SMARTDATA_ERROR'),
  resetSmartData: new ActionCreator<'RESET_SMARTDATA', undefined>('RESET_SMARTDATA'),

  valuateStart: new ActionCreator<'VALUATE_START', undefined>('VALUATE_START'),
  valuateDone: new ActionCreator<'VALUATE_DONE', ValuationResult>('VALUATE_DONE'),
  valuateError: new ActionCreator<'VALUATE_ERROR', AxiosError>('VALUATE_ERROR'),
  resetValuate: new ActionCreator<'RESET_VALUATE', undefined>('RESET_VALUATE'),


  getSmartDataResidentialReportStart: new ActionCreator<'GET_SMARTDATA_RESIDENTIAL_REPORT_START', undefined>('GET_SMARTDATA_RESIDENTIAL_REPORT_START'),
  getSmartDataResidentialReportDone: new ActionCreator<'GET_SMARTDATA_RESIDENTIAL_REPORT_DONE', undefined>('GET_SMARTDATA_RESIDENTIAL_REPORT_DONE'),
  getSmartDataResidentialReportError: new ActionCreator<'GET_SMARTDATA_RESIDENTIAL_REPORT_ERROR', AxiosError>('GET_SMARTDATA_RESIDENTIAL_REPORT_ERROR'),
};

export type DemoAction = typeof DemoActionCreators[keyof typeof DemoActionCreators];
