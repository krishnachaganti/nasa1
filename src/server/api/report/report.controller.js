import Report from '../../db/model/report.model';
import convert from 'simple-csv-to-json';
import transform from 'csv-to-json-stream';
import path from 'path';
import multer from 'multer';
import fs from 'fs-extra';
import reportError from '../../lib/errors/reportError';
import errors from '../../lib/errors';
import logger from '../../lib/logger';

const storage = multer.memoryStorage();
const upload = multer({
  storage
});
const ROOT_DIR = path.join(__dirname, '..', '..', '..', '..');

export const getAll = (req, res, next) => {
  Report.find({}, (err, reports) => {
    if (err) return console.log(err);
    res.status(200).json(reports);
  });
};

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
      const renamedFile = 'report' + - Date.now() + '.csv';
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

export function saveReport(req, res, next) {
  const newReport = new Report();

  newReport.save((err, report) => {
    if (err) {
      console.log(err);
    }
    res.status(201).json(report);
  });
}
