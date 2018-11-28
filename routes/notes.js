const express = require('express');

const router = express.Router();

const path = require('path');

router.get('/add-note', (req, res, next) => {
   res.sendFile(path.join(__dirname, '..', 'views', 'add-note.html'));
});

router.post('/save-notes', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'save-notes.html'));
});

module.exports = router;