/* global it, describe, before, post, get */

const request = require('supertest');
const expect = require('chai').expect;
import path from 'path';
const UPL_DIR = path.join(__dirname, '..', '..');
const file = `${UPL_DIR}/report.csv`;
import app from '../src/server/app';
describe('API tests', () => {
  describe('Status check', () => {
    it('returns 200 on /status path', done => {
      request(app)
        .get('/api/v1/status')
        .expect(200)
        .end(err => {
          if (err) {
            throw new Error(err);
          }
          done();
        });
    });
  });
  describe('Get all reports', () => {
    it('returns 200 on /reports', done => {
      request(app)
        .get('/api/v1/reports')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(res => {
          res.body.DoH = '2/18/2013';
          res.body.ITS_016_001 = '1/27/2016';
        })
        .end(err => {
          if (err) {
            throw new Error(err);
          }
          done();
        });
    });
  });
  describe('Uploading a new report', () => {
    it('returns 201 on a POST to /reports', done => {
      request(app)
        .post('/api/v1/reports')
        .set('Accept', 'application/json')
        .send(file)
        .expect(201);

      done();
    });
  });
});
