import express from 'express';
import * as controller from './people.controller';

const peopleRouter = express.Router();

peopleRouter.get('/', controller.getAll);
peopleRouter.get('/ita', controller.getITA);
peopleRouter.get('/itb', controller.getITB);
peopleRouter.get('/itc', controller.getITC);
peopleRouter.get('/itd', controller.getITD);
peopleRouter.get('/ite', controller.getITE);
peopleRouter.get('/itf', controller.getITF);
export default peopleRouter;
