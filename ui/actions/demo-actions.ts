import { ActionCreator } from "../helper/action-creator";
import { AxiosError } from "axios";
import { SmartdataResult } from "../models/smartdata";
import { ValuationResult } from "../models/valuate";
import { RentIndexList, RentIndex, RentResult } from "../models/rentindex";

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

  getRentIndexListStart: new ActionCreator<'GET_RENTINDEX_LIST_START', undefined>('GET_RENTINDEX_LIST_START'),
  getRentIndexListDone: new ActionCreator<'GET_RENTINDEX_LIST_DONE', RentIndexList>('GET_RENTINDEX_LIST_DONE'),
  getRentIndexListError: new ActionCreator<'GET_RENTINDEX_LIST_ERROR', AxiosError>('GET_RENTINDEX_LIST_ERROR'),


  getRentIndexStart: new ActionCreator<'GET_RENTINDEX_START', undefined>('GET_RENTINDEX_START'),
  getRentIndexDone: new ActionCreator<'GET_RENTINDEX_DONE', RentIndex>('GET_RENTINDEX_DONE'),
  getRentIndexError: new ActionCreator<'GET_RENTINDEX_ERROR', AxiosError>('GET_RENTINDEX_ERROR'),

  getRentCalculateStart: new ActionCreator<'GET_RENTCALCULATE_START', undefined>('GET_RENTCALCULATE_START'),
  getRentCalculateDone: new ActionCreator<'GET_RENTCALCULATE_DONE', RentResult[]>('GET_RENTCALCULATE_DONE'),
  getRentCalculateError: new ActionCreator<'GET_RENTCALCULATE_ERROR', AxiosError>('GET_RENTCALCULATE_ERROR'),
};

export type DemoAction = typeof DemoActionCreators[keyof typeof DemoActionCreators];
