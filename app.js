const express = require('express');

const bodyParser = require('body-parser');

const notesRoutes = require('./routes/notes.js');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use(notesRoutes);

app.get('/', (req, res, next) => {
   console.log('In de middleware');
   res.send('<h1>Goedemiddag allemaal</h1>')
});

app.listen(4000);