import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { createHistory } from 'history';
import routes from '../routes';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        reduxReactRouter({
          routes,
          createHistory
        })
  ));
}
