import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { createHistory } from 'history';
import routes from '../routes';
import rootReducer from '../reducers';
import reduxImmutableStateInvarient from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(thunk,reduxImmutableStateInvarient()),
        reduxReactRouter({
          routes,
          createHistory
        }),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
