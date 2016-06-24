global.__ENVIRONMENT__ = process.env.NODE_ENV || 'default';
require('dotenv').config({ silent: true });
import Express from 'express';
import http from 'http';
import path from 'path';
// import mailConnect from './lib/imap/imap';
import mailStatusConnect from './lib/imap/statusImap';
// import mailSurveyConnect from './lib/imap/surveyImap';
import webpack from 'webpack';
import logger from './lib/logger';
import ApiRouter from './api/apiRouter';
import watcher from './lib/watcher';
import renderReact from './lib/ssr/renderReact';

const port = process.env.PORT || 3000;
const app = Express();
app.server = http.createServer(app);

require('./config/express').default(app);
// Otherwise errors thrown in Promise routines will be silently swallowed.
// (e.g. any error during rendering the app server-side!)
process.on('unhandledRejection', (reason, p) => {
  if (reason.stack) {
    logger.error(reason.stack);
  } else {
    logger.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
  }
});

// Short-circuit the browser's annoying favicon request. You can still
// specify one as long as it doesn't have this exact name and path.
app.get('/favicon.ico', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'image/x-icon' });
  res.end();
});

app.use(Express.static(path.resolve(__dirname, 'dist')));

// Webpack Dev Server and Hot Reloading
if (!process.env.NODE_ENV) {
  const dev = require('webpack-dev-middleware');
  const hot = require('webpack-hot-middleware');
  const wpconfig = require('../../tools/webpack/wp.dev.config.js');
  const compiler = webpack(wpconfig);

  app.use(dev(compiler, {
    publicPath: wpconfig.output.publicPath
  }));
  app.use(hot(compiler));
}

// Three different IMAP services
mailStatusConnect();
// mailConnect();
// mailSurveyConnect();

app.use('/api/v1', ApiRouter);
// Send everything thats not /api/v1 to React
app.get('*', renderReact);

app.server.listen(port, (err) => {
  if (err) {
    logger.error(err);
  }
  logger.info(`🌎 Started on port ${app.server.address().port}`);
});
