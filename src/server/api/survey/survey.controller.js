import AWS from 'aws-sdk';
import reportError from '../../lib/errors/reportError';
import errors from '../../lib/errors';
import logger from '../../lib/logger';
import r from '../../db';

export function getAll(req, res, next) {
  r.table('survey')
    .run()
    .then(data => {
      res.status(200).json(data);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}
