import express from 'express';
import * as endpoints from './endpoints';

const router = express.Router();

router.route('/search').get(endpoints.search); // Search for leads
router.route('/').get(endpoints.getAll); // Fetch all leads
router.route('/').post(endpoints.create); // Insert leads

export = router;
