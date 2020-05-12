const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(morgan('dev'));

require('./routes')(app);

app.listen(3000, () => { console.log('Servidor iniciado - Escutando na porta 3000')})