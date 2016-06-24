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
