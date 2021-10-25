const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const client = mongoose
    .connect(process.env.MONGODB_HOST, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected'))
    .catch((e) => console.log('DB Error: ' + e));

module.exports = client;
