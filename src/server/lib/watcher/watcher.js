/* eslint-disable no-shadow */
import chokidar from 'chokidar';
import { join } from 'path';
import fs from 'fs-extra';


import logger from '../logger';
import convert from 'simple-csv-to-json';
import { saveReport } from '../../api/report/report.controller';
const TMP_DIR = join(__dirname, '..', '..', '..', '..', 'tmp');
const watcher = chokidar.watch(TMP_DIR, {
  ignored: /[\/\\]\./,
  persistent: true
});

watcher
  .on('add', path => {
    logger.info(`File ${path} has been added`);
    const result = convert.CSVtoJSON(path);
    const toSave = result.map(object => {
      delete object[''];
      return object;
    });

    logger.info(toSave, ' result');
    saveReport(toSave);
    logger.info('Saved to db!');
    // fs.remove(path, err => {
    //   if (err) {
    //     return logger.error(err);
    //   }
    //   logger.info('deleted!');
    // });
  })
  .on('change', path => logger.info(`File ${path} has been changed`))
  .on('unlink', path => logger.info(`File ${path} has been removed`));

export default watcher;
