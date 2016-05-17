import winston from 'winston';
import path from 'path';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      json: false,
      timestamp: false,
      colorize: true,
      showLevel: true,
      prettyPrint: true
    })
  ],
  exitOnError: false
});

export default logger;
