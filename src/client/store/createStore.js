/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
const devtools = window.devToolsExtension || (() => noop => noop);

export default function configureStore(initialState, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middleware = [thunkMiddleware];
  const reactRouterReduxMiddleware = routerMiddleware(history);

  middleware.push(reactRouterReduxMiddleware, createLogger());

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      devtools()
    )
  );


  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers'); // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
