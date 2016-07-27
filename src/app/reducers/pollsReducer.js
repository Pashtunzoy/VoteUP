import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function pollsReducer(state = initialState.polls, action) {
  switch (action.type) {
    case types.CREATE_POLLS_SUCCESS:
        console.log('Created poll');
      return [];
    case types.LOAD_POLLS_SUCCESS:
        console.log('Updated poll');
      return [];
    case types.UPDATE_POLLS_SUCCESS:
        console.log('Loaded poll');
      return [];
    case types.DELETE_POLLS_SUCCESS:
      console.log('Deleted poll');
    return [];
    default:
      return state;
  }
}
