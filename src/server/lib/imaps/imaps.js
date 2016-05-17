import imaps from 'imap-simple';
import fs from 'fs-extra';
import path from 'path';
import logger from '../logger';
import convert from 'simple-csv-to-json';
const UPL_DIR = path.join(__dirname, '..', '..', '..', '..', 'uploads');
// const file = `${UPL_DIR}/report.csv`;
// const result = convert.CSVtoJSON(file);
// logger.info(result);
const config = {
  imap: {
    user: 'splatter@axial.agency',
    password: 'Axial#2016!',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    authTimeout: 3000
  }
};
export default mailConnect => {
  imaps.connect(config).then(connection => {
    return connection.openBox('INBOX').then(() => {
      // Fetch emails from the last 96h
      const delay = 96 * 3600 * 1000;
      let yesterday = new Date();
      yesterday.setTime(Date.now() - delay);
      yesterday = yesterday.toISOString();
      const searchCriteria = ['UNSEEN', ['SINCE', yesterday]];
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
          return part.disposition && part.disposition.type === 'ATTACHMENT';
        }).map(part => {
          // retrieve the attachments only of the messages with attachments
          return connection.getPartData(message, part)
            .then(partData => {
              return {
                filename: part.disposition.params.filename,
                data: partData
              };
            });
        }));
      });
      return Promise.all(attachments);
    }).then(attachments => {
      console.log(attachments);
      const parseMe = attachments[0].data;
      fs.writeFile('uploads/repo' + - Date.now() + '.csv', parseMe, err => { // eslint-disable-line
        if (err) {
          throw err;
        }
        console.log('saved');
      });
    });
  });
};
