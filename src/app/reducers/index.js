import {combineReducers} from 'redux';
import { routerStateReducer } from 'redux-router';
import auth from './authReducer.js';
import polls from './pollsReducer.js';
import poll from './pollReducer.js';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  auth,
  poll,
  polls,
  router: routerStateReducer,
  ajaxCallsInProgress
});

export default rootReducer;
