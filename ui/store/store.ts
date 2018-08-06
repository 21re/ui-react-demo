import { createStore, applyMiddleware, compose } from "redux";
import { INITIAL_STATE, reducers } from "../reducers/reducers";
import { State } from "../reducers/state";
import { router } from "../router";
import { bindHistory } from "../helper/routing";

declare namespace window {
  const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export const store = createStore<State>(reducers, INITIAL_STATE, composeEnhancers(applyMiddleware()));

bindHistory(store.dispatch, router);
