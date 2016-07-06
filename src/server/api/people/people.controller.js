import reportError from '../../lib/errors/reportError';
import errors from '../../lib/errors';
import logger from '../../lib/logger';

import r from '../../db';

export function getAll(req, res, next) {
  r.table('people')
    .distinct()
    .run()
    .then(people => {
      res.status(200).json(people);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}
export function getITA(req, res, next) {
  r.table('people')
    .filter({ OrgCode: 'IT-A' })
    .run()
    .then(people => {
      res.status(200).json(people);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}
export function getITB(req, res, next) {
  r.table('people')
    .filter({ OrgCode: 'IT-B' })
    .run()
    .then(people => {
      res.status(200).json(people);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}
export function getITC(req, res, next) {
  r.table('people')
    .filter({ OrgCode: 'IT-C' })
    .run()
    .then(people => {
      res.status(200).json(people);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}
export function getITD(req, res, next) {
  r.table('people')
    .filter({ OrgCode: 'IT-D' })
    .run()
    .then(people => {
      res.status(200).json(people);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}
export function getITE(req, res, next) {
  r.table('people')
    .filter({ OrgCode: 'IT-E' })
    .run()
    .then(people => {
      res.status(200).json(people);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}
export function getITF(req, res, next) {
  r.table('people')
    .filter({ OrgCode: 'IT-F' })
    .run()
    .then(people => {
      res.status(200).json(people);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}

export function getContractors(req, res, next) {
  r.table('people')
    .filter({ NASAContactName: req.params.name })
    .distinct()
    .run()
    .then(contacts => {
      res.status(200).json(contacts);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}

export function updatePerson(req, res, next) {
  r.table('people')
    .get(req.params.id)
    .update({ kudos: r.row('kudos').default(0).add(1) })
    .then(contacts => {
      res.status(202).json(contacts);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}
