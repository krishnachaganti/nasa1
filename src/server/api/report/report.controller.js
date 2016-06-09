import convert from 'simple-csv-to-json';
import path from 'path';
import fs from 'fs-extra';
import reportError from '../../lib/errors/reportError';
import errors from '../../lib/errors';
import logger from '../../lib/logger';

import r from '../../db';

const ROOT_DIR = path.join(__dirname, '..', '..', '..', '..');

export function getAll(req, res, next) {
  r.table('reports')
    .run()
    .then(reports => {
      res.status(200).json(reports);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}
export function getPersonnel(req, res, next) {
  r.table('reports').getField('personnel')
    .run()
    .then(people => {
      res.status(200).json(people);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}
export function uploadReport(req, res, next) {
  let fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', (fieldname, file, filename) => {
    if (filename.length === 0) {
      res.sendStatus(400);
      res.json({
        message: 'No file selected!'
      });
    }

    logger.info(`Uploading: ${filename}`);

    // create 'uploads' folder if it doesn't exist
    const filePath = path.join(ROOT_DIR, '/uploads');
    fs.exists(filePath, exists => {
      if (!exists) {
        fs.mkdir(filePath);
      }
      const renamedFile = 'report' + -Date.now() + '.csv'; // eslint-disable-line
      fstream = fs.createWriteStream(path.join(filePath, renamedFile));

      file.pipe(fstream);
      fstream.on('close', () => {
        console.log(`Upload Finished of ${renamedFile}`);
        console.log(file);
      });
      res.sendStatus(201).end();
    // next(parseCSV());
    });
  });
}

export function saveReport(result, req, res, next) {
  const personnel = result;
  const report = {
    createdAt: Date.now(),
    personnel
  };
  r.table('reports').insert(report).run();
}
