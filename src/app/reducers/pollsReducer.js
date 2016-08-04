import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function pollsReducer(state = initialState.polls, action) {
  switch (action.type) {
    case types.LOAD_POLLS_REQUEST:
      console.log(initialState);
      return [...state];
    case types.LOAD_POLLS_SUCCESS:
      return [...action.polls];
    case types.LOAD_POLLS_FAILURE:
      return {errorMessage: action.err};
    case types.DELETE_POLL_SUCCESS:
      return state.filter(poll => poll._id !== action.id);
    case types.DELETE_POLL_FAILURE:
      return {errorMessage: action.err};
    default:
      return state;
  }
}
