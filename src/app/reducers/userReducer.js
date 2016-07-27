import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
        console.log('Created user');
      return {};
    case types.UPDATE_USER_SUCCESS:
        console.log('Updated user');
      return {};
    case types.LOAD_USER_SUCCESS:
        console.log('Loaded user');
      return {};
    case types.DELETE_USER_SUCCESS:
      console.log('Deleted user');
    return {};
    default:
      return state;
  }
}
