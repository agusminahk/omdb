const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');
const auth = require('./routes/auth');
const dotenv = require('dotenv');

const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

//conectarse a la db
dotenv.config();

mongoose
    .connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true }) //si no existe la base de datos se crea automaticamente
    .then(() => console.log('mongoDB conectado'));

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Api RESTful OKEy');
});
