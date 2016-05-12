// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
import Express from 'express';
import chalk from 'chalk';
import http from 'http';
import mongoose from 'mongoose';

import ApiRouter from './api/apiRouter';

import fs from 'fs';
import convert from 'simple-csv-to-json';
import path from 'path';
const file = __dirname + '/report.csv';
const result = convert.CSVtoJSON(file);

mongoose.connect('mongodb://104.236.173.141:27017/splatter');
const db = mongoose.connection;

const app = Express();
app.server = http.createServer(app);
require('./config/express').default(app);
app.use('/api/v1', ApiRouter);

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

app.server.listen(process.env.PORT || 3000, () => {
  console.log(`Started on port ${app.server.address().port}`);
  db.on('error', () => {
    console.error(chalk.red('MongoDB Connection Error. Please make sure that',
       'is running.'));
    process.exit(-1); // eslint-disable-line no-process-exit
  });

  db.once('open', callback => {
    console.info(chalk.green('Connected to MongoDB:'));
  });
});

export default app;
