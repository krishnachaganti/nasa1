import Report from '../../db/model/report.model';

export function getAll(req, res, next) {
  Report.find({}, function(err, reports) {
    if (err) return console.log(err);
    res.status(200).json(reports);
  });
}
