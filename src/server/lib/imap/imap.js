import fs from 'fs-extra';
import inspect from 'util';
import r from '../../db';
import path from 'path';
import logger from '../logger';
import convert from 'simple-csv-to-json';
const TMP_DIR = path.join(__dirname, '..', '..', '..', '..', 'tmp');
const imaps = require('imap-simple');

const config = {
  imap: {
    // user: 'status@nasaupdate.com',
    // password: 'u7d%8(KcbPE5u-8L',
    // host: 'mail.nasaupdate.com',
    user: 'reports@nasaupdate.com',
    password: 'kcDs.}bJ^Cg}5k?u',
    host: 'mail.nasaupdate.com',
    port: 993,
    tls: true,
    authTimeout: 3000
  }
};
export default mailConnect => {
  imaps.connect(config).then(connection => {
    return connection.openBox('INBOX').then(() => {
      // Fetch emails from the last 96h
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
      // const csvString = parseMe.toString().replace(/(,|\s)*(\n|\r|$)/g, '$2');
      const storage = {
        file: attachments[0].data,
        fileName: 'Report'
      };
      r.table('files').insert(storage).run();
      fs.writeFile(TMP_DIR + '/report' + - Date.now() + '.csv', parseMe, err => { // eslint-disable-line
        if (err) {
          throw err;
        }
        logger.info('saved');
      });
    });
  });
};
