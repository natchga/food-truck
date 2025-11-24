const router = require('express').Router()
const eventsController = require('../../../controllers/eventsController')

router.get('/', eventsController.getEvents)
router.get('/:id', eventsController.getEventById)
router.post('/', eventsController.createEvent)

module.exports = router
