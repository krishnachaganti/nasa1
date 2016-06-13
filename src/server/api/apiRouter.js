import Express from 'express';
import reportRouter from './report/index';
import peopleRouter from './people/index';
const router = Express.Router();

router.get('/status', (req, res) => res.send('OK'));
router.use('/reports', reportRouter);
router.use('/people', peopleRouter);
export default router;
