import express from 'express';
const router = express.Router();

import cteIndex from './controllers/clients/index.js';
router.get('/', (req, res) => { res.render('clients/home') } );
router.get('/servicios/Laboratorio_de_Geotecnia', (req, res) => { res.render('clients/laboratorio') });
router.get('/servicios/Ingenieria_y_Consultoria', (req, res) => { res.render('clients/consultora') });
router.get('/servicios/Innovacion_y_Desarrollo', (req, res) => { res.render('clients/innovacion') });
router.post('/contact/message', cteIndex.message );

export default router;