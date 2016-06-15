/*
 * RequestLogger.js
 *
 * The request logger is a middleware responsible
 * for logging each received request
 */

import logger from './index';

export default function(req, res, next) {
  logger.info(`received request: ${req.method} ${req.url} from IP: ${req.ip}`);
  next();
}
