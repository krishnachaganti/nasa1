import express from 'express';
import * as controller from './report.controller';

const reportRouter = express.Router();

reportRouter.get('/', controller.getAll);
reportRouter.post('/', controller.uploadReport);
reportRouter.get('/parse', controller.parseCSV);

export default reportRouter;
