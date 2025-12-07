const express = require('express')
const path = require('path')
const router = express.Router()

// should bring homepage
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

// should bring events 
router.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/events.html'))
})

// event by id hopefully
router.get('/event/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/event.html'))
})

// admin page
router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin.html'))
})

module.exports = router;
