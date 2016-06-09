import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/createStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createRoutes from './routes';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import preRenderMiddleware from './store/preRenderMiddleware';
injectTapEventPlugin();

const initialState = {};
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);


if (window.devToolsExtension) {
  window.devToolsExtension.open();
}

const MOUNT_NODE = document.getElementById('root');

function onUpdate() {
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }
  const { state: { components, params } } = this;
  preRenderMiddleware(store.dispatch, components, params);
}

ReactDOM.render(
  <Provider store={ store }>
  <MuiThemeProvider muiTheme={ getMuiTheme() }>
    <div className="layout">
      <Router history={ history } onUpdate={ onUpdate }>
       { routes }
       </Router>
    </div>
    </MuiThemeProvider>
  </Provider>,
  MOUNT_NODE
);
