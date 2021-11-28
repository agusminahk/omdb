const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const volleyball = require('volleyball');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

const client = require('./config/db');
const router = require('./routes');
require('./config/passport');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(volleyball);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 3600 * 24 * 60 * 60 * 365,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.use((req, res) => {
    res.status(404).send({ error: 'Not found' });
});

client.then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`App listening on ${process.env.PORT || 8080}`);
    });
});
