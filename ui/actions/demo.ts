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
import { ValuationRequest } from "../models/valuate";
import { XLCalculationRequest } from "../models/xlstore";
import { QuestionCatalogRequest } from "../models/rentindex";

export function checkToken(dispatch: Dispatch<State>): (token: string) => Promise<any> {
  return (token: string) => {
    return Axios.get("/v1/me", { headers: { 'Authorization': `Bearer ${token}` } }).then(
      () => {
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
export function getRentIndexList(dispatch: Dispatch<State>): () => void {
  return () => {
    dispatch(DemoActionCreators.getRentIndexListStart.create(undefined))
    return Axios.get("/v2/rentindex/list").then(
      (success: AxiosResponse) => {
        dispatch(DemoActionCreators.getRentIndexListDone.create(success.data))
      },
      (error: AxiosError) => {
        dispatch(DemoActionCreators.getRentIndexListError.create(error))
      }

    ) as Promise<any>
  }
}

export function getRentIndex(dispatch: Dispatch<State>): (city: string, year: number) => Promise<any> {
  return (city: string, year: number) => {
    dispatch(DemoActionCreators.getRentIndexStart.create(undefined))
    return Axios.get(`/v2/rentindex/${city}/${year}`).then(
      (success: AxiosResponse) => {
        dispatch(DemoActionCreators.getRentIndexDone.create(success.data))
      },
      (error: AxiosError) => {
        dispatch(DemoActionCreators.getRentIndexError.create(error))
      }

    ) as Promise<any>
  }
}

export function calculateRentIndex(dispatch: Dispatch<State>): (city: string, year: number, request: QuestionCatalogRequest) => Promise<any> {
  return (city: string, year: number, request: QuestionCatalogRequest) => {
    dispatch(DemoActionCreators.getRentCalculateStart.create(undefined))
    return Axios.post(`/v2/rentindex/${city}/${year}`, request).then(
      (success: AxiosResponse) => {
        dispatch(DemoActionCreators.getRentCalculateDone.create(success.data))
      },
      (error: AxiosError) => {
        dispatch(DemoActionCreators.getRentCalculateError.create(error))
      }
    ) as Promise<any>
  }
}

export function valuate(dispatch: Dispatch<State>): (request: ValuationRequest) => Promise<any> {
  return (request: ValuationRequest) => {
    dispatch(DemoActionCreators.valuateStart.create(undefined))
    return Axios.post("/v1/valuate/residential", request).then(
      (success: AxiosResponse) => {
        dispatch(DemoActionCreators.valuateDone.create(success.data))
      },
      (error: AxiosError) => {
        dispatch(DemoActionCreators.valuateError.create(error))
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

export function resetValuate(dispatch: Dispatch<State>): () => void {
  return () => {
    dispatch(DemoActionCreators.resetValuate.create(undefined))
  }
}

export function openXLStoreApp(dispatch: Dispatch<State>): (id: string) => void {
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

export function calculateXLStoreApp(dispatch: Dispatch<State>): (id: string, request: XLCalculationRequest) => void {
  return (id: string, request: XLCalculationRequest) => {
    dispatch(XLStoreActionCreators.calculateStart.create(undefined))
    return Axios.post(`/v1/xlstore/${id}/calculate`, request).then(
      (success: AxiosResponse) => {
        dispatch(XLStoreActionCreators.calculateDone.create(success.data))
      },
      (error: AxiosError) => {
        dispatch(XLStoreActionCreators.calculateError.create(error))
      }
    ) as Promise<any>
  }
}
