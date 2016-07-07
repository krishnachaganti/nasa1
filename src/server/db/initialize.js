const r = require('index');
require('rethinkdb-init')(r);

const initialize = () => r.init({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 28015,
  db: process.env.DB_DB || 'splatter'
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
      durability: 'soft'
    }, {
      name: 'people_collection',
      durability: 'soft'
    }, {
      name: 'nasa_contacts',
      durability: 'soft'
    }
  ]);

export default initialize;
