import Express from 'express';
import reportRouter from './report/index';

const router = Express.Router();

router.get('/status', (req, res) => res.send('OK'));
router.use('/reports', reportRouter);

export default router;
