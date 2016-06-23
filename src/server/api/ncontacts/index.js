import express from 'express';
import * as controller from './ncontacts.controller';

const nContactsRouter = express.Router();

nContactsRouter.get('/', controller.getAll);
nContactsRouter.post('/', controller.addNew);

export default nContactsRouter;
