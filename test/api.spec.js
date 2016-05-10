/* global it, describe, before, post, get */

const request = require('supertest');
const expect = require('chai').expect;

import app from '../src/server/app';
describe('API tests', () => {
  describe('Status check', () => {
    it('returns 200 on /status path', done => {
      request(app)
        .get('/api/status')
        .expect(200)
        .end(err => {
          if (err) {
            throw new Error(err);
          }
          done();
        });
    });
  });
});
