import express from 'express';
const router = express.Router();

import cteIndex from './controllers/clients/index.js';
router.get('/', cteIndex.home );

export default router;