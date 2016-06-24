import Express from 'express';
import reportRouter from './report/index';
import peopleRouter from './people/index';
import surveyRouter from './survey/index';
import nContactsRouter from './ncontacts/index';
const router = Express.Router();

router.get('/status', (req, res) => res.send('OK'));
router.use('/reports', reportRouter);
router.use('/people', peopleRouter);
router.use('/surveys', surveyRouter);
router.use('/ncontacts', nContactsRouter);

export default router;
