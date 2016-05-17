import rethinkdbdash from 'rethinkdbdash';

const config = {
  host: '104.236.173.141',
  port: 28015,
  db: 'splatter'
};

export default rethinkdbdash(config);
