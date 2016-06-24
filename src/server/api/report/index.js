import express from 'express';
import * as controller from './report.controller';

const reportRouter = express.Router();

reportRouter.get('/', controller.getAll);
reportRouter.get('/people', controller.getPersonnel);
reportRouter.get('/files', controller.getFiles);
export default reportRouter;
