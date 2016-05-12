import Report from '../../db/model/report.model';
import convert from 'simple-csv-to-json';
import path from 'path';

// const file = path.resolve(__dirname, '/report.csv');

export function getAll(req, res, next) {
  Report.find({}, (err, reports) => {
    if (err) return console.log(err);
    res.status(200).json(reports);
  });
}

export function parseCSV(req, res, next) {
  const file = __dirname + '/report.csv';
  const result = convert.CSVtoJSON(file).then((err) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.status(200).json(result);
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
