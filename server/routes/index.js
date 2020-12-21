const express = require('express');

const app = express();

app.use(require('./infoCiudades'))

module.exports = app;