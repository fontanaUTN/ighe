import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

import dotenv from 'dotenv';
dotenv.config();

app.use('/resources', express.static('public'));
app.use('/fileUpload', express.static('uploads'));

app.set('view engine', 'ejs');

import router from './router.js'
app.use('/', router);

app.set('port', process.env.PORT || 3000);

// app.use((req, res, next) => {
// 	res.status(404).render('errors/404');
// });

// app.use((error, req, res, next) => {
// 	if (error) {
// 		res.render('errors/page_error');
// 	}
// });

app.listen (app.get('port'), (req, res)=>{
	console.log('server iniciado');
});