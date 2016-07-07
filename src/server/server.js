import Express from 'express';
import http from 'http';
import path from 'path';
import mailConnect from './lib/imap/imap';
import mailStatusConnect from './lib/imap/statusImap';
import mailSurveyConnect from './lib/imap/surveyImap';
import webpack from 'webpack';
import logger from './lib/logger';
import ApiRouter from './api/apiRouter';
import watcher from './lib/watcher';
import renderReact from './lib/ssr/renderReact';
import { config } from './config/splatter';

const port = config.port;
const app = Express();
app.server = http.createServer(app);

require('./config/express').default(app);
app.get('/favicon.ico', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'image/x-icon' });
  res.end();
});

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
mailConnect();
mailSurveyConnect();

app.use('/api/v1', ApiRouter);

if (process.env.NODE_ENV) {
  app.use('/dist', Express.static(path.join(__dirname, '../../dist')));
}
app.use('/assets', Express.static(path.join(__dirname, '../../dist')));
// Send everything thats not /api/v1 to React
app.get('*', renderReact);
// app.use(Express.static(path.join(process.cwd(), 'dist')));
app.server.listen(port, (err) => {
  if (err) {
    logger.error(err);
  }
  logger.info(`🌎 Started on port ${app.server.address().port}`);
});
