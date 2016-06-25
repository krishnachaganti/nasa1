import rethinkdbdash from 'rethinkdbdash';

const config = {
  host: process.env.RDB_HOST,
  port: process.env.RDB_PORT,
  db: process.env.RDB_DB
};

const r = rethinkdbdash(config);

export default r;
