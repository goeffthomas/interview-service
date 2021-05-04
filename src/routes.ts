import express from 'express';
import leadsRouter from './leads';
const router = express.Router();

router.use('/leads', leadsRouter);
router.get('/', (_req, res) => {
	return res.send('OK');
});
export = router;
