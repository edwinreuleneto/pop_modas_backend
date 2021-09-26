import Routes from './app/routes';
import dotenv from 'dotenv';

dotenv.config();
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var cors = require('cors');

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use('/api', Routes);
if(process.env.API_STATUS == 'dev'){
    app.use(express.static(__dirname, { dotfiles: 'allow' } ));
    //RUN DEV
    app.listen(process.env.API_PORT, () => {
        console.log('\n \n ');
        console.log(`                             ::${process.env.API_PORT} - Correndo!                                   `);
    });
}else{
    const https = require('https');
    const fs = require('fs');
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.amorporpatinhas.com.br/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/api.amorporpatinhas.com.br/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/api.amorporpatinhas.com.br/chain.pem', 'utf8');
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };
    //RUN PROD
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(process.env.API_PORT, () => {
        console.log('\n \n ');
        console.log(`                             ::${process.env.API_PORT} - Correndo!                                   `);
    }); 
}

































