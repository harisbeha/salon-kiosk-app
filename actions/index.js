import { checkHttpStatus, parseJSON } from "../utils";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  CHECKIN_CUSTOMER,
  SERVICES_FETCH_REQUEST,
  SERVICES_FETCH_SUCCESS,
  SERVICES_FETCH_FAILURE,
  NEW_PRODUCTS_FETCH_REQUEST,
  NEW_PRODUCTS_FETCH_SUCCESS,
  NEW_PRODUCTS_FETCH_FAILURE
} from "../constants";

import { pushState } from "redux-router";
import jwtDecode from "jwt-decode";
import fetch from "isomorphic-fetch";

// User Authentication Actions
export function userLoginRequest() {
  return {
    type: USER_LOGIN_REQUEST
  };
}

export function userLoginSuccess(token) {
  localStorage.setItem("token", token);
  return {
    type: USER_LOGIN_SUCCESS,
    payload: {
      token: token
    }
  };
}

export function userLoginFailure(error) {
  localStorage.removeItem("token");
  return {
    type: USER_LOGIN_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function userLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("customer");
  return {
    type: USER_LOGOUT
  };
}

export function logoutRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    dispatch(pushState(null, "/login"));
  };
}

export function userLogin(phone, pin, redirect = "/landing") {
  return function(dispatch) {
    dispatch(userLoginRequest());
    return fetch("http://localhost:3000/api/auth/getToken/", {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phone: phone, pin: pin })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        try {
          let decoded = jwtDecode(response.token);
          dispatch(userLoginSuccess(response.token));
          dispatch(pushState(null, redirect));
        } catch (e) {
          dispatch(
            userLoginFailure({
              response: {
                status: 403,
                statusText: "Invalid token"
              }
            })
          );
        }
      })
      .catch(error => {
        dispatch(loginUserFailure(error));
      });
  };
}

// !TODO Notify stylist / tech appointment has arrived (larger salons)
export function checkIn() {
  localStorage.setItem("customer", "arrived");
  return {
    type: CHECKIN_CUSTOMER
  };
}

export function checkInRedirect() {
  return (dispatch, state) => {
    dispatch(checkin());
    dispatch(pushState(null, "/landing"));
  };
}

// Fetch hair / nail package requested by user upon creating appointment.
// Results returned based on resolved token
// !TODO Adjust backend to use token from header, as opposed to requiring as a param
export function servicesFetchRequest() {
  return {
    type: SERVICES_FETCH_REQUEST
  };
}

export function servicesFetchSuccess(token) {
  return {
    type: SERVICES_FETCH_SUCCESS,
    payload: {
      data: data
    }
  };
}

export function servicesFetchFailure(error) {
  localStorage.removeItem("token");
  return {
    type: SERVICES_FETCH_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function servicesFetch(token) {
  return (dispatch, state) => {
    dispatch(servicesFetchRequest());
    fetch_url = "http://localhost:3000/api/services/byToken/" + token;
    return fetch(fetch_url, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(servicesFetchSuccess(response.data));
      })
      .catch(error => {
        if (error.response.status === 401) {
          dispatch(servicesFetchFailure(error));
          dispatch(pushState(null, "/services"));
        }
      });
  };
}

// Retrieve new products for promotion
export function newProductsFetchRequest() {
  return {
    type: NEW_PRODUCTS_FETCH_REQUEST
  };
}

export function newProductsFetchSuccess(data) {
  return {
    type: NEW_PRODUCTS_FETCH_SUCCESS,
    payload: {
      data: data
    }
  };
}

export function newProductsFetchFailure(error) {
  return {
    type: NEW_PRODUCTS_FETCH_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function newProductsFetch() {
  return (dispatch, state) => {
    dispatch(newProductsFetchRequest());
    return fetch("http://localhost:3000/api/products/new/", {})
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(newProductsFetchSuccess(response.data));
      })
      .catch(error => {
        if (error.response.status === 401) {
          dispatch(newProductsFetchFailure(error));
          dispatch(pushState(null, "/"));
        }
      });
  };
}
