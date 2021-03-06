import { State } from "./reducers/state";
import { Router, Routes } from "./helper/routing";
import { NavigationPage, NavigationActionCreators } from "./actions/navigation";
import { checkToken, registerToken, openXLStoreApp } from "./actions/demo";
import { Promise } from "es6-promise";
import * as cookie from "cookie";

const routes: Routes<State> = {
  "/demo?token=:token": {
    name: NavigationPage.DemoIndex,
    action: (dispatch, params) => {
      const cookies = cookie.parse(document.cookie);
      if (cookies['TOKEN'] === params.token) {
        registerToken(dispatch)(params.token)
        dispatch(NavigationActionCreators.navigateTo.create({ name: NavigationPage.DemoIndex, params: {} }));
        return Promise.resolve(undefined)
      } else {
        return checkToken(dispatch)(params.token).then(() => {
          dispatch(NavigationActionCreators.navigateTo.create({ name: NavigationPage.DemoIndex, params: {} }));
        })
      }
    },
  },
  "/demo/smartdata": {
    name: NavigationPage.SmartDataQuery,
    action: (dispatch) => {
      dispatch(NavigationActionCreators.navigateTo.create({ name: NavigationPage.SmartDataQuery, params: {} }));
      return Promise.resolve(undefined)
    },
  },
  "/demo/valuate": {
    name: NavigationPage.Valuate,
    action: (dispatch) => {
      dispatch(NavigationActionCreators.navigateTo.create({ name: NavigationPage.Valuate, params: {} }));
      return Promise.resolve(undefined)
    },
  },
  "/demo/smartdata/residential-report": {
    name: NavigationPage.SmartDataResidentialReport,
    action: (dispatch) => {
      dispatch(NavigationActionCreators.navigateTo.create({ name: NavigationPage.SmartDataResidentialReport, params: {} }));
      return Promise.resolve(undefined)
    },
  },
  "/demo/calculate": {
    name: NavigationPage.Calculate,
    action: (dispatch) => {
      dispatch(NavigationActionCreators.navigateTo.create({ name: NavigationPage.Calculate, params: {} }))
      return Promise.resolve(undefined)
    },
  },
  "/demo/calculate/:id": {
    name: NavigationPage.AppDetails,
    action: (dispatch, params) => {
      openXLStoreApp(dispatch)(params.id)
      dispatch(NavigationActionCreators.navigateTo.create({ name: NavigationPage.AppDetails, params: { id: params.id } }))
      return Promise.resolve(undefined)
    },
  },
  "/demo/rentindex": {
    name: NavigationPage.RentIndex,
    action: (dispatch) => {
      dispatch(NavigationActionCreators.navigateTo.create({ name: NavigationPage.RentIndex, params: {} }))
      return Promise.resolve(undefined)
    },
  },
};

export const router = new Router<State>(routes);
