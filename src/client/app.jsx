import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'react-router-scroll';
import configureStore from './store/configureStore';
import createRoutes from './routes';

const initialState = {};
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      { routes }
    </Router>
  </Provider>, document.getElementById('app'));
