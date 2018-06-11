const port = process.env.PORT || 3000;

const path = require('path');

const express = require('express');
const handlebars = require('express-handlebars');

const bodyParser = require('body-parser');

const config = require('./config');
const app = express();

app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.use(express.static('public'));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

require('./controllers').init(app);

app.listen(port, (err) => {
    if(err) {
        console.error(err);
    }

    console.log(`Server is listening to port ${port}`);
});