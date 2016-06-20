import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import path from 'path';
import fs from 'fs-extra';
import reportError from '../../lib/errors/reportError';
import errors from '../../lib/errors';
import logger from '../../lib/logger';
import r from '../../db';

const ROOT_DIR = path.join(__dirname, '..', '..', '..', '..');

export function getAll(req, res, next) {

}

const s3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-1'
});

const multerOptions = {
  storage: multerS3({
    s3,
    bucket: 'boldr',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    ACL: 'public-read',
    region: 'us-west-1',
    endpoint: 's3.amazonaws.com',
    metadata(ctx, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(ctx, file, cb) {
      cb(null, `uploads/${file.fieldname}-${Date.now().toString()}${path.extname(file.originalname)}`);
    }
  })
};
const uploadFiles = multer(multerOptions);
export function uploadTaskOrder(result, req, res, next) {
  uploadFiles.single().then((data) => {
    console.log(data)
  });
}

export function saveReview(result, req, res, next) {

}
