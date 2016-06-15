import winston from './index';

export default function(req, res, next) {
  const _res = res.json;
  res.json = function(body) {
    _res.call(this, body);
    winston.info(`sent response: ${res.statusCode} ${res.statusMessage}`);
  };
  next();
}
