const express = require("express")
const router = express.Router()
const { getCollection, ObjectId } = require('../../../config/db')


// all events
router.get('/api/v1/events', async (req, res) => {
  try {
    const events = await eventsCollection.find().toArray()
    res.send(events)
  } catch (err) {
    res.send({ error: "Could not load events" })
  }
})

// using id
router.get("/:id", async (req, res) => {
  try {
    const events = await getCollection("food-truckAPI", "Events")
    const id = req.params.id

    const event = await events.findOne({ _id: new ObjectId(id) })

    if (!event) {
      return res.json({ error: "Event not found" })
    }

    res.json(event)

  } catch (err) {
    res.json({ error: "Could not get event" })
  }
})
router.post("/", async (req, res) => {
  try {
    const events = await getCollection("food-truckAPI", "Events")
    await events.insertOne(req.body)
    res.json({ message: "Event added successfully" })
  } catch (err) {
    console.error(err)
    res.json({ error: "Could not add event" })
  }
})

module.exports = router;
