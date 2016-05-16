// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
import Express from 'express';
import chalk from 'chalk';
import http from 'http';
import mongoose from 'mongoose';
import fs from 'fs-extra';
import convert from 'simple-csv-to-json';
import path from 'path';

import logger from './lib/logger';
import ApiRouter from './api/apiRouter';
import imaps from 'imap-simple';

const UPL_DIR = path.join(__dirname, '..', '..');
const file = `${UPL_DIR}/repo.csv`;
const result = convert.CSVtoJSON(file);
logger.info(result);
const config = {
  imap: {
    user: 'splatter@axial.agency',
    password: 'Axial#2016!',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    authTimeout: 3000
  }
};
imaps.connect(config).then(connection => {
  return connection.openBox('INBOX').then(() => {
    // Fetch emails from the last 24h
    const delay = 24 * 3600 * 1000;
    let yesterday = new Date();
    yesterday.setTime(Date.now() - delay);
    yesterday = yesterday.toISOString();
    const searchCriteria = ['UNSEEN', ['SINCE', yesterday]];
    const fetchOptions = {
      bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
      struct: true
    };

    // retrieve only the headers of the messages
    return connection.search(searchCriteria, fetchOptions);
  }).then(messages => {
    let attachments = [];

    messages.forEach(message => {
      const parts = imaps.getParts(message.attributes.struct);
      attachments = attachments.concat(parts.filter(part => {
        return part.disposition && part.disposition.type === 'ATTACHMENT';
      }).map(part => {
        // retrieve the attachments only of the messages with attachments
        return connection.getPartData(message, part)
          .then(partData => {
            return {
              filename: part.disposition.params.filename,
              data: partData
            };
          });
      }));
    });

    return Promise.all(attachments);
  }).then(attachments => {
    console.log(attachments);
    const parseMe = attachments[0].data;
    const newFile = fs.writeFile('repo.csv', parseMe, err => {
      if (err) {
        throw err;
      }
      console.log('saved');
    });
    const parsed = convert.CSVtoJSON(newFile);
    console.log(parsed)
  // =>
  //    [ { filename: 'cats.jpg', data: Buffer() },
  //      { filename: 'pay-stub.pdf', data: Buffer() } ]
  });
});
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
  logger.info(`Started on port ${app.server.address().port}`);
  db.on('error', () => {
    logger.error(chalk.red('MongoDB Connection Error. Please make sure that',
      'is running.'));
    process.exit(-1); // eslint-disable-line no-process-exit
  });

  db.once('open', callback => {
    logger.info(chalk.green('Connected to MongoDB:'));
  });
});

export default app;
