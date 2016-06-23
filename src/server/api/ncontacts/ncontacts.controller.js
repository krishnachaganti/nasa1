import reportError from '../../lib/errors/reportError';
import errors from '../../lib/errors';
import logger from '../../lib/logger';

import r from '../../db';

export function getAll(req, res, next) {
  r.table('nasa_contacts')
    .run()
    .then(contacts => {
      res.status(200).json(contacts);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}

export function addNew(req, res, next) {
  const nContact = {
    name: req.body.name,
    orgCode: req.body.orgCode,
    positionTitle: req.body.positionTitle,
    phone: req.body.phone
  }
  r.table('nasa_contacts')
    .insert(nContact)
    .run()
    .then(contact => {
      res.status(201).json(contact);
    })
    .error(err => {
      return res.status(500).json(err);
    });
}
