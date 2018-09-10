import { ActionCreator } from "../helper/action-creator";

export type NavigationPage = "DemoIndex" | "SmartDataQuery" | "SmartDataResidentialReport" | "Calculate" | "AppDetails" | "Valuate";

export const NavigationPage: { [key in NavigationPage]: NavigationPage } = {
  DemoIndex: "DemoIndex",
  SmartDataQuery: "SmartDataQuery",
  SmartDataResidentialReport: "SmartDataResidentialReport",
  Calculate: "Calculate",
  AppDetails: "AppDetails",
  Valuate: "Valuate",
};

export const NavigationActionCreators = {
  navigateTo: new ActionCreator<"NAVIGATE_TO", { name: NavigationPage, params: { [name: string]: string } }>("NAVIGATE_TO"),
};

export type NavigationAction = typeof NavigationActionCreators[keyof typeof NavigationActionCreators];
