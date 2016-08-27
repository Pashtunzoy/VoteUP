import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.PROFILE_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case types.PROFILE_SUCCESS:
      return Object.assign({}, state, { isFetching: false, isAuthenticated: true, user: action.user });
    case types.PROFILE_FAILURE:
      return Object.assign({}, state, { isFetching: false, isAuthenticated: false, errorMessage: action.err });
    case types.SIGNUP_REQUEST:
      return Object.assign({}, state, { isFetching: true, user: {} });
    case types.SIGNUP_SUCCESS:
      return Object.assign({}, state, { isFetching: false });
    case types.SIGNUP_FAILURE:
      return Object.assign({}, state, { isFetching: false, errorMessage: action.err });
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, { isFetching: true, isAuthenticated: false, errorMessage: '' });
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, { isAuthenticated: true, isFetching: false, user: action.user});
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, { isFetching: false, isAuthenticated: false, errorMessage: action.err });
    case types.LOGOUT_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, { isFetching: false, isAuthenticated: false, user: {} });
    case types.LOGOUT_FAILURE:
      return state;
    default:
      return state;
  }
}
