// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
import Express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import ApiRouter from './api/apiRouter';

import fs from 'fs';

const app = Express();

app.server = http.createServer(app);

mongoose.connect('mongodb://104.236.173.141:27017/splatter');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());
app.use('/api', ApiRouter);

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
});

export default app;
