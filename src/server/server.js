import Express from 'express';
import chalk from 'chalk';
import http from 'http';
import fs from 'fs-extra';
import convert from 'simple-csv-to-json';
import path from 'path';
import imaps from 'imap-simple';
import webpack from 'webpack';
import logger from './lib/logger';
import ApiRouter from './api/apiRouter';
import watcher from './lib/watcher';

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
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));
  app.use(hot(compiler));
}
app.use('/api/v1', ApiRouter);
app.get('*', require('../app').serverMiddleware);

app.server.listen(port, (err) => {
  if (err) {
    logger.error(err);
  }
  logger.info(`🌎 Started on port ${app.server.address().port}`);
});
