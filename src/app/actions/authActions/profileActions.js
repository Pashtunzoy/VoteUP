import * as types from '../actionTypes';
import { browserHistory } from 'react-router';
import {receiveLogout} from './logoutActions';

export function profileRequest() {
  return {type: types.PROFILE_REQUEST, isFetching: true };
}

export function profileSuccess(user) {
  return {type: types.PROFILE_SUCCESS, isFetching: false, user: user };
}

export function profileFailure(message) {
  return {type: types.PROFILE_SUCCESS, isFetching: false, err: message };
}


export function getProfile() {
  let config = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.JWT
    }
  };
  return (dispatch, getState) => {
      dispatch(profileRequest());
      return fetch(`${types.AUTH_ENDPOINT}/profile`, config)
      .then(res => res.json() )
      .then(user => {
        dispatch(profileSuccess(user));
      })
      .catch(err => {
        localStorage.removeItem('JWT');
        localStorage.removeItem('user_id');
        dispatch(receiveLogout());
      });
  }
}
