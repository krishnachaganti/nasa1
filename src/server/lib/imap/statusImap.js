import fs from 'fs-extra';
import inspect from 'util';
import r from '../../db';
import path from 'path';
import logger from '../logger';
import convert from 'simple-csv-to-json';
import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';


const TMP_DIR = path.join(__dirname, '..', '..', '..', '..', 'tmp');
const imaps = require('imap-simple');
const UPL_DIR = path.join(__dirname, '..', '..', '..', '..', 'uploads/status');
const config = {
  imap: {
    user: process.env.STATUS_MAIL_USER,
    password: process.env.STATUS_MAIL_PASSWORD,
    host: process.env.MAIL_HOST,
    port: 993,
    tls: true,
    authTimeout: 3000
  }
};

const s3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-1'
});

const multerOptions = {
  storage: multerS3({
    s3,
    bucket: 'boldr',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    ACL: 'public-read',
    region: 'us-west-1',
    endpoint: 's3.amazonaws.com',
    metadata(ctx, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(ctx, file, cb) {
      cb(null, `uploads/${file.fieldname}-${Date.now().toString()}${path.extname(file.originalname)}`);
    }
  })
};
const uploadFiles = multer(multerOptions);
export default mailStatusConnect => {
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
        Bucket: 'boldr',
        Key: attachments[0].filename,
        Body: attachments[0].data
      };
      s3.upload(params, (err, data) => {
        logger.info(err, data);
        const extracted = data.key.split('_');
        const fileData = {
          location: data.Location,
          key: extracted[5],
          orgCode: extracted[0],
          preparer: extracted[1] + ' ' + extracted[2],
          periodStart: extracted[3],
          periodEnd: extracted[4]
        };
        logger.info('saving to s3');
        r.table('status_reports').insert(fileData).run();
      });
        logger.info('saved to status_reports ', fileData);
      });
    });
};
