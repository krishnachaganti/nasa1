import rethinkdbdash from 'rethinkdbdash';
import { config } from '../config/splatter';
const cfg = {
  host: config.db.host,
  port: config.db.port,
  db: config.db.name
};

const r = rethinkdbdash(cfg);

export default r;
