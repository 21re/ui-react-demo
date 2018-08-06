import { Dispatch } from "redux";
import { State } from "../reducers/state";
import { DemoActionCreators } from "./demo-actions";
import { NavigationActionCreators, NavigationPage } from "./navigation";
import { AxiosResponse, AxiosError, default as Axios } from "axios";
import { Promise } from "es6-promise";
import * as cookie from "cookie";
import { Address } from "../models/address";
import * as download from "downloadjs";
import { XLStoreActionCreators } from "./xlstore-actions";

export function checkToken(dispatch: Dispatch<State>): (token: string) => Promise<any> {
  return (token: string) => {
    return Axios.get("/v1/me", { headers: { 'Authorization': `Bearer ${token}` } }).then(
      (success: AxiosResponse) => {
        registerToken(dispatch)(token)
      },
      (error: AxiosError) => {
        dispatch(DemoActionCreators.setError.create(error))
      }
    ) as Promise<any>
  }
}

export function registerToken(dispatch: Dispatch<State>): (token: string) => void {
  return (token: string) => {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    document.cookie = cookie.serialize('TOKEN', token)
    dispatch(DemoActionCreators.setToken.create(token))
  }
}

export function querySmartData(dispatch: Dispatch<State>): (address: Address) => Promise<any> {
  return (address: Address) => {
    dispatch(DemoActionCreators.querySmartDataStart.create(undefined))
    return Axios.post("/v1/smartdata/residential/data", address).then(
      (success: AxiosResponse) => {
        dispatch(DemoActionCreators.querySmartDataDone.create(success.data))
      },
      (error: AxiosError) => {
        dispatch(DemoActionCreators.querySmartDataError.create(error))
      }
    ) as Promise<any>
  }
}

export function getSmartDataResidentialReport(dispatch: Dispatch<State>): (address: Address) => Promise<any> {
  return (address: Address) => {
    dispatch(DemoActionCreators.getSmartDataResidentialReportStart.create(undefined))
    return Axios.post("/v1/smartdata/residential/report", address, { responseType: "blob" }).then(
      (success: AxiosResponse) => {
        dispatch(DemoActionCreators.getSmartDataResidentialReportDone.create(undefined))

        download(success.data, "smartdata-residential.pdf", "application/pdf")
      },
      (error: AxiosError) => {
        dispatch(DemoActionCreators.getSmartDataResidentialReportError.create(error))
      }
    ) as Promise<any>
  }
}

export function navigateTo(dispatch: Dispatch<State>): (navigationPage: NavigationPage, params?: any) => void {
  return (navigationPage: NavigationPage, params?: any) => {
    dispatch(NavigationActionCreators.navigateTo.create({ name: navigationPage, params: params }))
  }
}

export function getXLStoreApps(dispatch: Dispatch<State>): () => Promise<any> {
  return () => {
    dispatch(XLStoreActionCreators.getXLStoreAppsStart.create(undefined))
    return Axios.get("/v1/xlstore").then(
      (success: AxiosResponse) => {
        dispatch(XLStoreActionCreators.getXLStoreAppsDone.create(success.data))
      },
      (error: AxiosError) => {
        dispatch(XLStoreActionCreators.getXLStoreAppsError.create(error))
      }
    ) as Promise<any>
  }
}

export function getXLStoreAppDetails(dispatch: Dispatch<State>): (id: string) => Promise<any> {
  return (id: string) => {
    dispatch(XLStoreActionCreators.getXLStoreAppDetailsStart.create(undefined))
    return Axios.get(`/v1/xlstore/${id}`).then(
      (success: AxiosResponse) => {
        dispatch(XLStoreActionCreators.getXLStoreAppDetailsDone.create(success.data))
      },
      (error: AxiosError) => {
        dispatch(XLStoreActionCreators.getXLStoreAppDetailsError.create(error))
      }
    ) as Promise<any>
  }
}

export function navigateSmartDataQuery(dispatch: Dispatch<State>): () => void {
  return () => {
    dispatch(NavigationActionCreators.navigateTo.create({ name: NavigationPage.SmartDataQuery, params: {} }))
  }
}

export function navigateHome(dispatch: Dispatch<State>): (token: string) => void {
  return (token: string) => {
    dispatch(NavigationActionCreators.navigateTo.create({ name: NavigationPage.DemoIndex, params: { token: token } }))
  }
}

export function navigateCalculate(dispatch: Dispatch<State>): () => void {
  return () => {
    dispatch(NavigationActionCreators.navigateTo.create({ name: NavigationPage.Calculate, params: {} }))
  }
}

export function resetSmartData(dispatch: Dispatch<State>): () => void {
  return () => {
    dispatch(DemoActionCreators.resetSmartData.create(undefined))
  }
}

export function openXLApp(dispatch: Dispatch<State>): (id: string) => void {
  return (id: string) => {
    dispatch(XLStoreActionCreators.getXLStoreAppDetailsStart.create(undefined))
    dispatch(NavigationActionCreators.navigateTo.create({ name: NavigationPage.AppDetails, params: { id: id } }))
    return Axios.get(`/v1/xlstore/${id}`).then(
      (success: AxiosResponse) => {
        dispatch(XLStoreActionCreators.getXLStoreAppDetailsDone.create(success.data))
      },
      (error: AxiosError) => {
        dispatch(XLStoreActionCreators.getXLStoreAppDetailsError.create(error))
      }
    ) as Promise<any>
  }
}

export function calculate(dispatch: Dispatch<State>): (id: string, payload: { [k: string]: string }) => void {
  return (id: string, payload: { [k: string]: string }) => {
    dispatch(XLStoreActionCreators.calculateStart.create(undefined))
    return Axios.post(`/v1/xlstore/${id}/calculate`, payload).then(
      (success: AxiosResponse) => {
        dispatch(XLStoreActionCreators.calculateDone.create(success.data))
      },
      (error: AxiosError) => {
        dispatch(XLStoreActionCreators.calculateError.create(error))
      }
    ) as Promise<any>
  }
}
