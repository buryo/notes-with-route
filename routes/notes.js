const fs = require('fs');
const express = require('express');
const router = express.Router();
const json = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Loop through json array and look for the title
let getNote = (title) => {
    return json.find(item => {
        return item.title === title;
    });
};

/*
    Get add note form
 */
router.get('/add-note', (req, res, next) => {
    res.render('add-note');
});

/*
    To add a note
 */
router.post('/add-note', (req, res, next) => {
    /*
        If :note exist, it gives a message only
        Else :push the new note object to our json file
     */
    if (getNote(req.body.title)) {
        res.send('Note bestaat al!');
    } else {
        json.push(req.body);
        fs.writeFileSync('./data.json', JSON.stringify(json));
        res.redirect('/all-notes');
    }
});

/*
 To get all notes.
 Send the json file as 'notes' variable to the view
 */
router.get('/all-notes', (req, res, next) => {
    //Render view with the json array
    res.render('notes', {notes: json});
});

/*
    To get the form where we can type the title of our note, which we want to see
 */
router.get('/get-note', (req, res, next) => {
    res.render('get-note');
});

/*
    To get one specific note
    if we have found the note: Render the view and send
 */
router.post('/get-note', (req, res, next) => {
    /*
        Check if note exist with the same given title
        true: render the note with note object
        false: render only note page, without data
     */
    if (getNote(req.body.title)) {
        res.render('note', {note: getNote(req.body.title)})
    } else {
        res.render('note');
    }
});

/*
    To get the delete form
 */
router.get('/delete-note', (req, res, next) => {
    res.render('delete-note');
});

/*
    To delete a note
 */
router.post('/delete-note', (req, res, next) => {
    if (getNote(req.body.title)) {
        let data = json.filter(object => object.title !== req.body.title);
        fs.writeFileSync('./data.json', JSON.stringify(data));
        res.send("Note has been removed amigo!");
    } else {
        res.send("Couldn't find the note");
    }
});

// Home page router
router.get('/', (req, res, next) => {
    res.render('index');
});

module.exports = router;
