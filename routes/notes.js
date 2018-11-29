const fs = require('fs');
const express = require('express');
const router = express.Router();
const json = JSON.parse(fs.readFileSync('data.json', 'utf8'));


router.get('/add-note', (req, res, next) => {
    res.render('add-note');
});

router.post('/add-note', (req, res, next) => {
    json.push(req.body);
    fs.writeFileSync('./data.json', JSON.stringify(json));
    res.redirect('/all-notes');
});

router.get('/all-notes', (req, res, next) => {
    res.render('notes', { notes:json });
});

router.get('/get-note', (req, res, next) => {
    res.render('get-note');
});

router.post('/get-note', (req, res, next) => {
    console.log('you wanted to look for a note?');
});

router.get('/delete-note', (req, res, next) => {
    res.render('delete-note');
});

router.get('/', (req, res, next) => {
    res.render('index');
});

module.exports = router;
