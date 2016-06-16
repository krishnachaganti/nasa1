import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../state/reducers';
import createLogger from 'redux-logger';

export default function configureStore(initialState, history) {
  const middleware = [thunkMiddleware];
  const reactRouterReduxMiddleware = routerMiddleware(history);

  middleware.push(reactRouterReduxMiddleware, createLogger());

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../state/reducers', () => {
      const nextRootReducer = require('../state/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
