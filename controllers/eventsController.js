const Event = require('../models/Event')

module.exports = {
    getEvents: async (req, res) => {
        const events = await Event.find()
        res.json(events)
    },

    getEventById: async (req, res) => {
        const event = await Event.findById(req.params.id)
        res.json(event)
    },

    createEvent: async (req, res) => {
        const newEvent = await Event.create(req.body)
        res.json(newEvent)
    }
}
