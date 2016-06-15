import path from 'path';
import React from 'react';

import { Provider } from 'react-redux';
import { Router, match, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import preRenderMiddleware from 'app/store/preRenderMiddleware';
import routes from 'app/routes';
import createStore from 'app/store/createStore';

import Html from 'components/Html';

export default (req, res, next) => {
  if (__DEV__) {
    webpackIsomorphicTools.refresh();
  }
  const {url} = req;
  const memHistory = createMemoryHistory(url);
  const location = memHistory.createLocation(url);

  const store = createStore(memHistory, {});
  const history = syncHistoryWithStore(memHistory, store);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }
  match({
    routes,
    location
  }, (err, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
      return;
    }

    if (err || !renderProps) {
      next(err);
      return;
    }

    const {dispatch} = store;

    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      dispatch
    };

    const {components} = renderProps;
    preRenderMiddleware(
      dispatch,
      components,
      renderProps.params
    )
      .then(() => {
        const root = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
        );

        const state = store.getState();

        const HtmlComponent = (
        <Html
        assets={webpackIsomorphicTools.assets()}
        content={renderToString(root)}
        state={state} />
        );
        global.navigator = {
          userAgent: req.headers['user-agent']
        };
        const markup = renderToStaticMarkup(HtmlComponent);
        const page = `<!doctype html>${markup}`;
        res.end(page);
      }).catch(err => res.status(500).send(err.stack));
  });
};
