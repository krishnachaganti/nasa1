import path from 'path';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { Router, match, createMemoryHistory, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import preRenderMiddleware from 'app/utils.render/preRenderMiddleware';
import createRoutes from 'app/routes';
import configureStore from 'app/utils.redux/configureStore';
import Helmet from 'react-helmet';
import Html from 'app/utils.render/Html';
import { LOAD_PEOPLE } from 'state/people/people';

export default (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    webpackIsomorphicTools.refresh();
  }
  const { url } = req;
  const memHistory = createMemoryHistory(url);
  const location = memHistory.createLocation(url);

  const store = configureStore(memHistory, {});
  const routes = createRoutes(store)
  const history = syncHistoryWithStore(memHistory, store);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (process.env.NODE_ENV === 'production') {
    hydrateOnClient();
    return;
  }
    match({ routes, location: req.url} , (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      // This method waits for all render component
      // promises to resolve before returning to browser
      preRenderMiddleware(
        store.dispatch,
        props.components,
        props.params
      )
      .then(() => {
        const state = store.getState();
        const root = (
        <Provider store={store}>
          <MuiThemeProvider muiTheme={ getMuiTheme() }>
            <RouterContext {...props} />
          </MuiThemeProvider>
        </Provider>
        );
        const head = Helmet.rewind();
        const HtmlComponent = (
          <Html
            assets={ webpackIsomorphicTools.assets() }
            content={ renderToString(root) }
            head={ head }
            state={ state }
          />
        );
        global.navigator = {
          userAgent: req.headers['user-agent']
        };
        const markup = renderToString(HtmlComponent);
        const page = `<!doctype html>${markup}`;
        res.end(page);
      }).catch(err => res.status(500).send(err.stack));
  };
});
};
