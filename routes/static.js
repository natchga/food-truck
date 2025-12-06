const express = require('express');
const path = require('path');
const router = express.Router();

// EVENTS LIST PAGE
router.get('/events', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/events.html'));
});

// SINGLE EVENT PAGE
router.get('/event/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/event.html'));
});

// HOME PAGE
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
