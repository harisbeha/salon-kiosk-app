import { createReducer } from "../utils";
import {
  SERVICES_FETCH_REQUEST,
  SERVICES_FETCH_SUCCESS,
  SERVICES_FETCH_FAILURE
} from "../constants";

const initialState = {
  services: [],
  statusText: "",
  isFetching: false
};

export default createReducer(initialState, {
  [SERVICES_FETCH_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  [SERVICES_FETCH_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      services: payload.data,
      isFetching: false
    });
  },
  [SERVICES_FETCH_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: payload.error,
      isFetching: true
    });
  }
});
