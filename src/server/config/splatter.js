import convict from 'convict';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const conf = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test', 'stage'],
    default: 'dev',
    env: 'NODE_ENV',
    arg: 'env'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
    arg: 'ip'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port'
  },
  db: {
    name: {
      doc: 'Name of the database.',
      format: String,
      default: 'splatter',
      env: 'DB_NAME',
      arg: 'dbName'
    },
    host: {
      doc: 'Host of the database.',
      format: String,
      default: '104.236.173.141',
      env: 'DB_HOST',
      arg: 'dbHost'
    },
    port: {
      doc: 'Port used by the database.',
      format: Number,
      default: 28015,
      env: 'DB_PORT',
      arg: 'dbPort'
    }
  },
  mail: {
    host: {
      doc: 'The IMAP host address.',
      format: String,
      default: 'mail.nasaupdate.com',
      env: 'MAIL_HOST',
      arg: 'mailhost'
    },
    report: {
      user: {
        doc: 'Username for the report email.',
        format: String,
        default: 'reports@nasaupdate.com',
        env: 'REPORT_MAIL_USER',
        arg: 'dbUser'
      },
      password: {
        doc: 'Password for the report email.',
        format: String,
        default: 'kcDs.}bJ^Cg}5k?u',
        env: 'REPORT_MAIL_PASSWORD',
        arg: 'reportmailpassword'
      }
    },
    status: {
      user: {
        doc: 'Username for status email.',
        format: String,
        default: 'status@nasaupdate.com',
        env: 'STATUS_MAIL_USER',
        arg: 'statusmailuser'
      },
      password: {
        doc: 'Password for status email.',
        format: String,
        default: 'u7d%8(KcbPE5u-8L',
        env: 'STATUS_MAIL_PASSWORD',
        arg: 'statusmailpassword'
      }
    },
    survey: {
      user: {
        doc: 'Username for survey email',
        format: String,
        default: 'survey@nasaupdate.com',
        env: 'SURVEY_MAIL_USER',
        arg: 'surveymailuser'
      },
      password: {
        doc: 'Password for the survey email.',
        format: String,
        default: 'uauwar9TRZ',
        env: 'SURVEY_MAIL_PASSWORD',
        arg: 'surveymailpassword'
      }
    }
  },
  aws: {
    id: {
      doc: 'AWS Access Key Id.',
      format: String,
      default: 'AKIAJHZ4BQWIOP7GPHHQ',
      env: 'AWS_ACCESS_KEY_ID',
      arg: 'awsid'
    },
    secret: {
      doc: 'AWS secret access key',
      format: String,
      default: 'DOawgyFh6VIhCVTw',
      env: 'AWS_SECRET_ACCESS_KEY',
      arg: 'awssecret'
    },
    bucket: {
      doc: 'Password for the survey email.',
      format: String,
      default: 'nasaupdate',
      env: 'AWS_BUCKET',
      arg: 'awsbucket'
    }
  }
});

// Load environment dependent configuration
const env = conf.get('env');
conf.loadFile(path.normalize(`${__dirname}/${env}.json`));

// Perform validation
conf.validate({
  strict: true
});

// console.log(`ENV ${env}`);
export const config = conf.getProperties();
