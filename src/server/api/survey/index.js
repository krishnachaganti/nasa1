import express from 'express';
import * as controller from './survey.controller';

const surveyRouter = express.Router();

surveyRouter.get('/', controller.getAll);

export default surveyRouter;
