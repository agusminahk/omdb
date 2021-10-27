const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv');
const volleyball = require('volleyball');
const cors = require('cors');
const passport = require('passport');

const client = require('./config/db');
const router = require('./routes');

dotenv.config();
const app = express();
require('./config/passport');

app.use(express.json());
app.use(cors());
app.use(volleyball);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            url: 'mongodb://localhost:27017/',
            databaseName: 'omdb',
            collection: 'sessions',
            autoReconnect: true,
        }),
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('HOME');
});

client.then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`App listening on ${process.env.PORT || 8080}`);
    });
});
