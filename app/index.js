const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const rp = require('request-promise');

const port = 3000;
const app = express();
//const apiKey = 'D1U1ITGyCz6MXWRFTsasfkuyA2pi3hbJ';
const apiKey = 'hoArfRosT1215';


app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (request, response) => {
    rp({
        method: 'get',
        uri: 'https://jsonplaceholder.typicode.com/posts/1',
        json: true,
        proxy: 'http://10.3.0.1:8080',
    })
    .then((data) => {
        response.render('index', data);
    })
    .catch((err) => {
        console.log(err);
        response.render('error', {
            errorMsg: err
        });
    });
});

app.listen(port, (err) => {
    if(err) {
        return console.log("Something wrong happened", err);
    }

    console.log(`Listening to port: ${port}`);
});