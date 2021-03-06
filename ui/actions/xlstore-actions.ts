
import { ActionCreator } from "../helper/action-creator";
import { AxiosError } from "axios";
import { XLStoreApp, XLStoreAppDetails, XLCalculationResult } from "../models/xlstore"

export const XLStoreActionCreators = {
  getXLStoreAppsStart: new ActionCreator<'GET_XLSTORE_APPS_START', undefined>('GET_XLSTORE_APPS_START'),
  getXLStoreAppsDone: new ActionCreator<'GET_XLSTORE_APPS_DONE', XLStoreApp[]>('GET_XLSTORE_APPS_DONE'),
  getXLStoreAppsError: new ActionCreator<'GET_XLSTORE_APPS_ERROR', AxiosError>('GET_XLSTORE_APPS_ERROR'),

  getXLStoreAppDetailsStart: new ActionCreator<'GET_XLSTORE_APP_DETAILSSTART', undefined>('GET_XLSTORE_APP_DETAILSSTART'),
  getXLStoreAppDetailsDone: new ActionCreator<'GET_XLSTORE_APP_DETAILSDONE', XLStoreAppDetails>('GET_XLSTORE_APP_DETAILSDONE'),
  getXLStoreAppDetailsError: new ActionCreator<'GET_XLSTORE_APP_DETAILSERROR', AxiosError>('GET_XLSTORE_APP_DETAILSERROR'),

  calculateStart: new ActionCreator<'CALCULATE_START', undefined>('CALCULATE_START'),
  calculateDone: new ActionCreator<'CALCULATE_DONE', XLCalculationResult>('CALCULATE_DONE'),
  calculateError: new ActionCreator<'CALCULATE_ERROR', AxiosError>('CALCULATE_ERROR'),
};

export type XLStoreAction = typeof XLStoreActionCreators[keyof typeof XLStoreActionCreators];
