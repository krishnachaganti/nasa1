import Express from 'express';

const router = Express.Router();

router.get('/status', (req, res) => res.send('OK'));

export default router;
