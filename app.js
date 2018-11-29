const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/notes.js');
const path = require('path');

const app = express();

// define Views folder and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(routes);

app.listen(4000);