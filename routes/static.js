const router = require('express').Router();
const path = require('path');
const root = path.join(__dirname, '..', 'public');

// Home
router.get('/', (req, res) => {
    res.sendFile('index.html', { root });
});

// Events list (landing page)
router.get('/event', (req, res) => {
    res.sendFile('events.html', { root });
});

router.get('/event/:eventId', (req, res) => {
    res.sendFile('event.html', { root });
});




// Admin page
router.get('/admin', (req, res) => {
    res.sendFile('admin.html', { root });
});

module.exports = router;
