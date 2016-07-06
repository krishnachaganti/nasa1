import fs from 'fs-extra';
import inspect from 'util';
import r from '../../db';
import path from 'path';
import logger from '../logger';
import convert from 'simple-csv-to-json';
import { config } from '../../config/splatter';
const TMP_DIR = path.join(__dirname, '..', '..', '..', '..', 'tmp');
const imaps = require('imap-simple');

const cfg = {
  imap: {
    user: config.mail.report.user,
    password: config.mail.report.password,
    host: config.mail.host,
    port: 993,
    tls: true,
    keepAlive: true,
    authTimeout: 3000
  }
};
export default mailConnect => {
  imaps.connect(cfg).then(connection => {
    return connection.openBox('INBOX').then(() => {
      // Fetch emails from the last 24h
      const delay = 24 * 3600 * 1000;
      let yesterday = new Date();
      yesterday.setTime(Date.now() - delay);
      yesterday = yesterday.toISOString();
      const searchCriteria = ['UNSEEN'];
      const fetchOptions = {
        bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
        struct: true
      };

      // retrieve only the headers of the messages
      return connection.search(searchCriteria, fetchOptions);
    }).then(messages => {
      let attachments = [];

      messages.forEach(message => {
        const parts = imaps.getParts(message.attributes.struct);
        attachments = attachments.concat(parts.filter(part => {
          return part.disposition && part.disposition.type === 'attachment';
        }).map(part => {
          // retrieve the attachments only of the messages with attachments
          return connection.getPartData(message, part)
            .then(partData => {
              logger.debug(`THIS IS THE PART DATA ${partData}`);
              return {
                filename: part.disposition.params.filename,
                data: partData
              };
            });
        }));
      });
      return Promise.all(attachments);
    }).then(attachments => {
      const parseMe = attachments[0].data;
      const csvString = parseMe.toString().replace(/(,|\s)*(\n|\r|$)/g, '$2');

      fs.writeFile(TMP_DIR + '/report' + - Date.now() + '.csv', csvString, err => { // eslint-disable-line
        if (err) {
          throw err;
        }
        logger.info('saved');
      });
    });
  });
};
