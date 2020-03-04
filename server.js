'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./settings/db');
const cors = require('cors');
const helmet = require('helmet');
const publicRoute = require('./src/routes/public/index');
const privateRoute = require('./src/routes/private/index');

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(helmet());

app.use('/api/v1/', privateRoute);
app.use('/api/v1/public', publicRoute);


db.connect().then(() => {
        app.listen(port, host);
        const today = new Date();
        const hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
        const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
        const seconds = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
        console.warn('---------------------------------');
        console.warn(`Time: ${hours}:${minutes}:${seconds}`);
        console.warn('Server running at ' + host + ':' + port);
    })
    .catch((err) => {
        console.error(err);
    });