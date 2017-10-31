import "babel-core/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Root from "./containers/Root";
import configureStore from "./store/configureStore";
import { userLoginSuccess } from "./actions";

const target = document.getElementById("root");
const store = configureStore(window.__INITIAL_STATE__);

const node = <Root store={store} />;

let token = localStorage.getItem("token");
if (token !== null) {
  store.dispatch(userLoginSuccess(token));
}

ReactDOM.render(node, target);
