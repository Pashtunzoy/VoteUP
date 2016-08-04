import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.PROFILE_REQUEST:
        console.log('Profile Request');
      return Object.assign({}, state, { isFetching: true });
    case types.PROFILE_SUCCESS:
        console.log('Profile Success');
      return Object.assign({}, state, { isFetching: false, user: action.user });
    case types.PROFILE_FAILURE:
        console.log('Profile failure');
      return Object.assign({}, state, { isFetching: false, errorMessage: action.err });
    case types.SIGNUP_REQUEST:
        console.log('Signup Request');
      return Object.assign({}, state, { isFetching: true });
    case types.SIGNUP_SUCCESS:
        console.log('Signup Success');
      return Object.assign({}, state, { isFetching: false });
    case types.SIGNUP_FAILURE:
        console.log('Signup failure');
      return Object.assign({}, state, { isFetching: false, errorMessage: action.err });
    case types.LOGIN_REQUEST:
      console.log('Login Request');
      return Object.assign({}, state, { isFetching: true, errorMessage: '' });
    case types.LOGIN_SUCCESS:
        console.log('Login Success');
      return Object.assign({}, state, { isAuthenticated: true, isFetching: false, user: action.user});
    case types.LOGIN_FAILURE:
        console.log('Login failure');
      return Object.assign({}, state, { isFetching: false, errorMessage: action.err });
    case types.LOGOUT_REQUEST:
        console.log('Logout Request');
      return Object.assign({}, state, { isFetching: true });
    case types.LOGOUT_SUCCESS:
      console.log('Logout Success');
      return Object.assign({}, state, { isFetching: false, isAuthenticated: false });
    case types.LOGOUT_FAILURE:
        console.log('Logout failure');
      return state;
    default:
      return state;
  }
}
