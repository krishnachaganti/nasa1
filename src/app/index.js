import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import preRenderMiddleware from 'app/utils.render/preRenderMiddleware';
import createRoutes from './routes.jsx';
import configureStore from 'app/utils.redux/configureStore';
import './styles/main.scss';
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

injectTapEventPlugin();

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }
  const { state: { components, params } } = this;
  preRenderMiddleware(store.dispatch, components, params);
}
const routes = createRoutes(store);
const root = (
<Provider store={ store }>
  <MuiThemeProvider muiTheme={ getMuiTheme() }>
    <Router history={ history } onUpdate={ onUpdate } key={ Math.random() }>
        { routes }
    </Router>
  </MuiThemeProvider>
</Provider>
);

const MOUNT_DOM = document.getElementById('root');

ReactDOM.render(root, MOUNT_DOM);
