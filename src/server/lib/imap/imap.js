// import fs from 'fs-extra';
// import { inspect } from 'util';
// import path from 'path';
// import logger from '../logger';
// import base64 from 'base64-stream';
// import convert from 'simple-csv-to-json';
// const UPL_DIR = path.join(__dirname, '..', '..', '..', '..', 'uploads');
// // const imaps = require('imap-simple');
// import Imap from 'imap';
// const imap = new Imap({
//   user: 'reports@nasaupdate.com',
//   password: 'kcDs.}bJ^Cg}5k?u',
//   host: 'mail.nasaupdate.com',
//   port: 993,
//   tls: true,
//   keepalive: {
//     interval: 3600,
//     idleInterval: 3600,
//     forceNoop: true
//   }
// });
// function toUpper(thing) { return thing && thing.toUpperCase ? thing.toUpperCase() : thing; }
//
// function findAttachmentParts(struct, attachments) {
//   attachments = attachments || [];
//   for (let i = 0, len = struct.length, r; i < len; ++i) {
//     if (Array.isArray(struct[i])) {
//       findAttachmentParts(struct[i], attachments);
//     } else {
//       if (struct[i].disposition && ['INLINE', 'ATTACHMENT'].indexOf(toUpper(struct[i].disposition.type)) > -1) {
//         attachments.push(struct[i]);
//       }
//     }
//   }
//   return attachments;
// }
// function buildAttMessageFunction(attachment) {
//   const filename = attachment.params.name;
//   const encoding = attachment.encoding;
//       console.log('attach', attachment);
//   return function(msg, seqno) {
//
//
//     const prefix = `(# ${seqno} ) `;
//     msg.on('body', (stream, info) => {
//       // Create a write stream so that we can stream the attachment to file;
//       console.log(`${prefix} Streaming this attachment to file`, filename, info);
//       const writeStream = fs.createWriteStream(filename);
//
//       writeStream.on('finish', () => {
//         console.log(`${prefix} Done writing to file %s`, filename);
//       });
//
//       // stream.pipe(writeStream); this would write base64 data to the file.
//       // so we decode during streaming using
//       if (toUpper(encoding) === 'BASE64') {
//         // the stream is base64 encoded, so here the stream is decode on the fly and piped to the write stream (file)
//         stream.pipe(base64.decode()).pipe(writeStream);
//       } else {
//         // here we have none or some other decoding streamed directly to the file which renders it useless probably
//         stream.pipe(writeStream);
//       }
//     });
//     msg.once('end', () => {
//       console.log(`${prefix} Finished attachment %s`, filename);
//     });
//   };
//
// }
// function openInbox(cb) {
//   imap.openBox('INBOX', true, cb);
// }
// imap.once('ready', () => {
//   openInbox((err, box) => {
//     if (err) {
//       throw err;
//     }
//     const f = imap.seq.fetch(`${box.messages.total} :*`, {
//       bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
//       struct: true
//     });
//     f.on('message', (msg, seqno) => {
//       logger.info('Message #%d', seqno);
//       const prefix = `(# ${seqno} ) `;
//       msg.on('body', (stream, info) => {
//         if (info.which === 'TEXT') {
//           logger.info(`${prefix} Body [%s] found, %d total bytes`, inspect(info.which), info.size);
//         }
//         let buffer = '';
//         let count = 0;
//         stream.on('data', chunk => {
//           count += chunk.length;
//           buffer += chunk.toString('utf8');
//           if (info.which === 'TEXT') {
//             logger.info(`${prefix} Body [%s] (%d/%d)`, inspect(info.which), count, info.size);
//           }
//         });
//         stream.once('end', () => {
//           if (info.which !== 'TEXT') {
//             logger.info(`${prefix} Parsed header: %s`, inspect(Imap.parseHeader(buffer)));
//           } else {
//             logger.info(`${prefix} + Body [%s] Finished`, inspect(info.which));
//           }
//         });
//       });
//       msg.once('attributes', attrs => {
//         const attachments = findAttachmentParts(attrs.struct);
//         logger.info(`${prefix}Attributes: %s`, inspect(attrs, false, 8));
//         for (let i = 0, len = attachments.length; i < len; ++i) {
//           const attachment = attachments[i];
//           /* This is what each attachment looks like {
//               partID: '2',
//               type: 'application',
//               subtype: 'octet-stream',
//               params: { name: 'file-name.ext' },
//               id: null,
//               description: null,
//               encoding: 'BASE64',
//               size: 44952,
//               md5: null,
//               disposition: { type: 'ATTACHMENT', params: { filename: 'file-name.ext' } },
//               language: null
//             }
//           */
//
//           console.log(`${prefix} Fetching attachment %s`, attachment.params.name);
//           imap.fetch(attrs.uid, { // do not use imap.seq.fetch here
//             bodies: [attachment.partID],
//             struct: true
//           });
//           // build function to process attachment message
//           f.on('message', buildAttMessageFunction(attachment));
//         }
//       });
//       msg.once('end', () => {
//         logger.info(`${prefix} Finished`);
//       });
//     });
//     f.once('error', () => {
//       logger.error(`Fetch error: ${err}`);
//     });
//     f.once('end', () => {
//       logger.info('Done fetching all messages!');
//       imap.end();
//     });
//   });
// });
//
// imap.once('error', err => {
//   console.log(err);
// });
//
// imap.once('end', () => {
//   console.log('Connection ended');
// });
//
// imap.connect();
import fs from 'fs-extra';
import inspect from 'util';
import r from '../../db';
import path from 'path';
import logger from '../logger';
import convert from 'simple-csv-to-json';
const UPL_DIR = path.join(__dirname, '..', '..', '..', '..', 'uploads');
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
            console.log(partData);
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
    fs.writeFile(UPL_DIR + '/report' + - Date.now() + '.csv', parseMe, err => { // eslint-disable-line
      if (err) {
        throw err;
      }
      logger.info('saved');
    });
  });
});
