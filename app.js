import Routes from './app/routes';
import dotenv from 'dotenv';

dotenv.config();
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var cors = require('cors');
var whitelist = [
  '*'
];


var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use('/api', cors(corsOptionsDelegate), Routes);
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

































