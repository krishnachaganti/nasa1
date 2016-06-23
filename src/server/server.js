import Express from 'express';
import chalk from 'chalk';
import http from 'http';
import fs from 'fs-extra';
import convert from 'simple-csv-to-json';
import path from 'path';
import imaps from 'imap-simple';
import mailConnect from './lib/imap/imap';
// import mailStatusConnect from './lib/imap/status.imap';
import webpack from 'webpack';
import logger from './lib/logger';
import ApiRouter from './api/apiRouter';
import watcher from './lib/watcher';
import renderReact from './lib/ssr/renderReact';

const dev = require('webpack-dev-middleware');
const hot = require('webpack-hot-middleware');
const config = require('../../tools/webpack/wp.dev.config.js');
const UPL_DIR = path.join(__dirname, '..', '..', 'uploads');
const port = process.env.PORT || 3000;
const app = Express();
app.server = http.createServer(app);
global.__ENVIRONMENT__ = process.env.NODE_ENV || 'default';
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

if (!process.env.NODE_ENV) {
  const compiler = webpack(config);

  app.use(dev(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: false,
      errorDetails: false,
      warnings: false,
      publicPath: false
    }
  }));
  app.use(hot(compiler));
}
// require('./lib/imap/imap');
// require('./lib/imap/status.imap');
// mailStatusConnect();
// mailConnect();
app.use('/api/v1', ApiRouter);
app.get('*', renderReact);

app.server.listen(port, (err) => {
  if (err) {
    logger.error(err);
  }
  logger.info(`🌎 Started on port ${app.server.address().port}`);
});
