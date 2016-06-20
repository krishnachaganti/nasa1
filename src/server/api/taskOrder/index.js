import express from 'express';
import * as controller from './taskOrder.controller';

const taskOrderRouter = express.Router();

taskOrderRouter.get('/', controller.getAll);
taskOrderRouter.post('/', controller.uploadTaskOrder);

export default taskOrderRouter;
