const express = require('express');
const dotenv = require('dotenv');

const client = require('./config/db');

dotenv.config();

const app = express();

client.then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`App listening on ${process.env.PORT || 8080}`);
    });
});
