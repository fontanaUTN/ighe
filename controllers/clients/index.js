import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config();

const home = (req, res) => {
    res.render('templates/building');
}

const message = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    const emailVer = /\S+@\S+\.\S+/;
    
    if(name == '' || email == '' || !emailVer.test(email) || message == ''){
        res.json({
            response: false,
            msg: 'Error! Por favor, complete todos los campos.'
        });
    }
    else {
        try {
            let transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: 465,
                secure: true, 
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS, 
                },
            });
        
            await transporter.sendMail({
                from: `"IGHE Web" <${process.env.EMAIL_USER}>`,
                to: "ingenieria@ighe.com.ar",
                cc: "fontana.utn@gmail.com",
                subject: `Consulta desde Web - ${name}`, 
                html: `
                    <div style="border: 5px solid #1d1d1b; padding: 5px; margin: 5px; font-size: 100%;">
                        <span style="padding: 20px 5px 20px 5px; background: #fff; display: flex; position: relative; aling-items: center; justify-content: center; flex-wrap: wrap;">
                            <img style="width: 20%; min-width: 400px; margin-left: auto; margin-right: auto;" src="https://ighe.com.ar/resources/images/logo.png">
                        </span>
                        <span style="width: calc(100% - 44px); border: 2px solid #1d1d1b; display: block; background: #ffffff; padding: 10px 20px 20px 20px;">
                            <p style="font-family: roboto; font-size: 25px; color: #fff; background: #000; padding: 5px 15px; display: block; width: max-content; margin-left: auto; margin-right: auto;"><b>NUEVA CONSULTA WEB</b></p>
                            <p style="font-family: roboto; font-size: 20px; color: #000000; margin-block-end: 5px;"><b>Nombre:</b> ${ name }</p>
                            <p style="font-family: roboto; font-size: 20px; color: #000000; margin-block-end: 5px;"><b>Email:</b> ${ email }</p>
                            <p style="font-family: roboto; font-size: 20px; color: #000000; margin-block-end: 5px;"><b>Telefono:</b> ${ phone }</p>
                            <p style="font-family: roboto; font-size: 20px; color: #000000; margin-block-end: 5px;"><b>Consulta:</b> ${ message }</p>
                        </span>
                        <span style="width: calc(100% - 20px); display: block;  background: #1d1d1b; padding: 10px;">
                            <a style="font-family: roboto; font-size: 15px; display: block; text-align: end; color: #ffffff;" href="https://ighe.com.ar/">www.ighe.com.ar</a>
                        </span>
                    </div>
                `, 
            });

            res.json({
                response: true,
            });
        }
        catch{
            res.json({
                response: false,
            });
        }
    }
}

export default {
    home,
    message
}