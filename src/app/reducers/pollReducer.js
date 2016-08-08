import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function pollReducer(state = initialState.poll, action) {
  switch (action.type) {
    case types.CREATE_POLL_SUCCESS:
      return Object.assign({}, ...state, action.poll);
    case types.UPDATE_POLL_SUCCESS:
      return {};
    case types.LOAD_POLL_SUCCESS:
      return Object.assign({}, ...state, action.poll);
    case types.LOAD_POLL_FAILURE:
      return Object.assign({}, action.err);
    case types.POLL_VOTE_SUCCESS:
      return Object.assign({}, ...state, action.poll);
    case types.POLL_VOTE_FAILURE:
      return {};
    default:
      return state;
  }
}
