import Express from 'express';

import * as reportController from './report/report.controller';
const router = Express.Router();

router.get('/status', (req, res) => res.send('OK'));
router.get('/reports', reportController.getAll);
router.get('/reports/csv', reportController.parseCSV);

export default router;
