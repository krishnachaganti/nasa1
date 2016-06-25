import r from './index';
require('rethinkdb-init')(r);

const initialize = () => r.init({
  host: process.env.RDB_HOST || 'localhost',
  port: process.env.RDB_PORT || 28015,
  db: process.env.RDB_DB || 'splatter'
},
  [
    {
      name: 'people',
      durability: 'soft',
      indexes: [
        {
          name: 'orgCode'
        }]
    }, {
      name: 'reports',
      durability: 'soft',
      indexes: [
        {
          name: 'createdAt'
        }
      ]
    }, {
      name: 'survey',
      durability: 'soft',
      indexes: [
        {
          name: 'location'
        },
        {
          name: 'orgCode'
        }
      ]
    }, {
      name: 'status_reports',
      durability: 'soft',
      indexes: [
        {
          name: 'location'
        }, {
          name: 'orgCode'
        }
      ]
    }
  ]);

export default initialize;
