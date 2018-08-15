import { default as React } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { MainFrame } from "./main-frame";
import * as promise from "es6-promise";

promise.polyfill();

render((
  <Provider store={store}>
    <MainFrame />
  </Provider>
), document.getElementById('demo'));
