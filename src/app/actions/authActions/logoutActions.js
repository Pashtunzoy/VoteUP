import * as types from '../actionTypes';

export function requestLogout() {
  return {
    type: types.LOGOUT_REQUEST,
    isFetching: true
  };
}

export function receiveLogout() {
  return {
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}


export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('JWT');
    localStorage.removeItem('user_id');
    dispatch(receiveLogout());
  };
}
