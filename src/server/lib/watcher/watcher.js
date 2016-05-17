/* eslint-disable no-shadow */
import chokidar from 'chokidar';
import { join } from 'path';
import logger from '../logger';
import convert from 'simple-csv-to-json';

const UPL_DIR = join(__dirname, '..', '..', '..', '..', 'uploads');
const watcher = chokidar.watch(UPL_DIR, {
  ignored: /[\/\\]\./,
  persistent: true
});

watcher
  .on('add', path => {
    logger.info(`File ${path} has been added`);
    const result = convert.CSVtoJSON(path);
    logger.info(result);
  })
  .on('change', path => logger.info(`File ${path} has been changed`))
  .on('unlink', path => logger.info(`File ${path} has been removed`));

export default watcher;
