// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
import Express from 'express';
import chalk from 'chalk';
import http from 'http';
import fs from 'fs-extra';
import convert from 'simple-csv-to-json';
import path from 'path';
import imaps from 'imap-simple';

const UPL_DIR = path.join(__dirname, '..', '..', 'uploads');
import logger from './lib/logger';
import ApiRouter from './api/apiRouter';
import watcher from './lib/watcher';
const frontend = require('./lib/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const app = Express();
app.server = http.createServer(app);

require('./config/express').default(app);

app.use('/api/v1', ApiRouter);
const webpackConfig = isDev
  ? require('../../webpack/webpack.dev.babel')
  : require('../../webpack/webpack.prod.babel');

app.use(frontend(webpackConfig));


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
require('./lib/imap/imap');
require('./lib/imap/status.imap');
app.server.listen(process.env.PORT || 3000, () => {
  logger.info(`Started on port ${app.server.address().port}`);
});

export default app;
