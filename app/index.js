const path = require('path');

const express = require('express');
const handlebars = require('express-handlebars');

const bodyParser = require('body-parser');

const config = require('../config');
const app = express();

app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.use(express.static('public'));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

require('./audio').init(app);

module.exports = app;