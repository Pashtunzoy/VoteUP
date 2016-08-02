import {combineReducers} from 'redux';
import { routerStateReducer } from 'redux-router';
import user from './userReducer.js';
import polls from './pollsReducer.js';
import poll from './pollReducer.js';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  user,
  poll,
  polls,
  router: routerStateReducer,
  ajaxCallsInProgress
});

export default rootReducer;
