import express from 'express';
import * as controller from './report.controller';

const reportRouter = express.Router();

reportRouter.get('/', controller.getAll);

export default reportRouter;
