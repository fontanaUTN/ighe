import express from 'express';
const router = express.Router();

import cteIndex from './controllers/clients/index.js';
router.get('/', cteIndex.home );
router.get('/home', (req, res) => { res.render('clients/home') } );
router.post('/contact/message', cteIndex.message );

export default router;