import { createReducer } from "../utils";
import {
  NEW_PRODUCTS_FETCH_REQUEST,
  NEW_PRODUCTS_FETCH_SUCCESS,
  NEW_PRODUCTS_FETCH_FAILURE
} from "../constants";

const initialState = {
  products: [],
  statusText: "",
  isFetching: false
};

export default createReducer(initialState, {
  [NEW_PRODUCTS_FETCH_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  [NEW_PRODUCTS_FETCH_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      products: payload.data,
      isFetching: false
    });
  },
  [NEW_PRODUCTS_FETCH_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: payload.error,
      isFetching: true
    });
  }
});
