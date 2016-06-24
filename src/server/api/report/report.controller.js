import path from 'path';
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

export function getFiles(req, res, next) {
  r.table('status_reports')
    .run()
    .then(data => {
      res.status(200).json(data);
    })
    .error(err => {
      return res.status(500).json(err);
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
