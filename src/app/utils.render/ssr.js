import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Router, match, RouterContext, browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../styles/main.scss';
import routes from '../routes.jsx';
import Html from './Html.jsx';
import configureStore from '../utils.redux/configureStore';

injectTapEventPlugin();
const isClient = typeof document !== 'undefined';

if (isClient) {
  const store = configureStore(window.__INITIAL_STATE__);

  ReactDOM.render(
  <MuiThemeProvider muiTheme={ getMuiTheme() }>
    <Provider store={store}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
  );
}

function renderComponentWithRoot(Component, componentProps, store) {
  const componentHtml = renderToStaticMarkup(
 <MuiThemeProvider muiTheme={ getMuiTheme() }>
    <Provider store={store}>
      <Component {...componentProps} />
    </Provider>
     </MuiThemeProvider>
  );

  const head = Helmet.rewind();
  const initialState = store.getState();
  const assets = webpackIsomorphicTools.assets();
  return '<!doctype html>\n' + renderToString(
    <Html component={componentHtml} initialState={initialState} head={head} assets={ assets } />
  );
}

function handleError(res, error) {
  res.status(500).send(error.message);
}

function handleRedirect(res, redirectLocation) {
  res.redirect(302, redirectLocation.pathname + redirectLocation.search);
}

function routeIsUnmatched(renderProps) {
  return renderProps.routes[renderProps.routes.length - 1].path === '*';
}

function handleRoute(res, renderProps) {
  const store = configureStore();
  const status = routeIsUnmatched(renderProps) ? 404 : 200;
  const readyOnAllActions = renderProps.components
    .filter((component) => component.readyOnActions)
    .map((component) => component.readyOnActions(store.dispatch, renderProps.params));

  Promise
    .all(readyOnAllActions)
    .then(() => res.status(status).send(renderComponentWithRoot(RouterContext, renderProps, store)));
}

function serverMiddleware(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      handleError(error);
    } else if (redirectLocation) {
      handleRedirect(res, redirectLocation);
    } else if (renderProps) {
      handleRoute(res, renderProps);
    } else {
      // This should actually never happen, as Routes.js has a catch-all '*' path.
      res.sendStatus(404);
    }
  });
}

export default serverMiddleware;
