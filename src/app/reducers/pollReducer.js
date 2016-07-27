import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function pollReducer(state = initialState.poll, action) {
  switch (action.type) {
    case types.CREATE_POLL_SUCCESS:
        console.log('Created poll');
      return {};
    case types.UPDATE_POLL_SUCCESS:
        console.log('Updated poll');
      return {};
    case types.LOAD_POLL_SUCCESS:
        console.log('Loaded poll');
      return {};
    case types.DELETE_POLL_SUCCESS:
      console.log('Deleted poll');
    return {};
    default:
      return state;
  }
}
