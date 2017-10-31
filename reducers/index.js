import { combineReducers } from "redux";
import { routerStateReducer } from "redux-router";
import auth from "./auth";
import newProducts from "./newProducts";
import services from "./services";

export default combineReducers({
  auth,
  newProducts,
  services,
  router: routerStateReducer
});
