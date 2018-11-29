const fs = require('fs');
const express = require('express');
const router = express.Router();
const json = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Loop through json array and look for the title
let getNote = (title) => {
    return json.find( item => {
        return item.title === title;
    });
};

router.get('/add-note', (req, res, next) => {
    res.render('add-note');
});

router.post('/add-note', (req, res, next) => {
    // check if duplicated, so not? we can add the new note
    if (getNote(req.body.title)){
        res.send('Note bestaat al!');
    } else{
        json.push(req.body);
        fs.writeFileSync('./data.json', JSON.stringify(json));
        res.redirect('/all-notes');
    }
});

router.get('/all-notes', (req, res, next) => {
    //Render view with the json array
    res.render('notes', { notes:json });
});

router.get('/get-note', (req, res, next) => {
    res.render('get-note');
});

router.post('/get-note', (req, res, next) => {
    if (getNote(req.body.title)){
        res.render('note', { note:getNote(req.body.title) })
    } else{
        res.render('note');
    }
});

router.get('/delete-note', (req, res, next) => {
    res.render('delete-note');
});

router.get('/', (req, res, next) => {
    res.render('index');
});

module.exports = router;
