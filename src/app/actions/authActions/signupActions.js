import * as types from '../actionTypes';

export function signupRequest() {
  return { type: types.SIGNUP_REQUEST };
}

export function signupSuccess() {
  return { type: types.SIGNUP_SUCCESS };
}

export function signupFailure(err) {
  return { type: types.SIGNUP_FAILURE, err };
}

export function signupUser(creds) {
  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  };
  return (dispatch, getState) => {
    dispatch(signupRequest());
    return fetch(`${types.AUTH_ENDPOINT}/register`, config)
    .then(res => res.json() )
    .then(user => {
      if (!user.success) {
        return dispatch(signupFailure(user.message));
      }
      dispatch(signupSuccess());
    })
    .catch(err => {
      dispatch(signupFailure(err));
    });
  }
}
