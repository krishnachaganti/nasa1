import fs from 'fs-extra';
import inspect from 'util';
import r from '../../db';
import path from 'path';
import logger from '../logger';
import convert from 'simple-csv-to-json';
import AWS from 'aws-sdk';
import { config } from '../../config/splatter';
const imaps = require('imap-simple');

const cfg = {
  imap: {
    user: config.mail.status.user,
    password: config.mail.status.password,
    host: config.mail.host,
    port: 993,
    tls: true,
    keepAlive: true,
    authTimeout: 3000
  }
};

const s3 = new AWS.S3({
  secretAccessKey: config.aws.secret,
  accessKeyId: config.aws.id,
  region: 'us-west-1'
});

export default mailStatusConnect => {
  imaps.connect(cfg).then(connection => {
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
      logger.info(messages);
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
      const params = {
        Bucket: config.aws.bucket,
        Key: attachments[0].filename,
        Body: attachments[0].data
      };
      s3.upload(params, (err, data) => {
        logger.info(err, data);
        const extracted = data.key.split('_');
        const fileData = {
          location: data.Location,
          key: extracted[7],
          month: extracted[0],
          year: extracted[1],
          orgCode: extracted[2],
          preparer: extracted[3] + ' ' + extracted[4],
          periodStart: extracted[5],
          periodEnd: extracted[6]
        };
        logger.info('saving to s3');
        r.table('status_reports').insert(fileData).run();
      });
        logger.info('saved to status_reports ', fileData);
      });
    });
};
