const express = require("express")
const router = express.Router()
const { getCollection, ObjectId } = require("../../../config/db")

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await getCollection("food-truckAPI", "Events")
    const list = await events.find().toArray()
    res.json(list)
  } catch (err) {
    res.json({ error: "Could not load events" })
  }
})

// GET event by id
router.get("/:id", async (req, res) => {
  try {
    const events = await getCollection("food-truckAPI", "Events")
    const id = req.params.id

    const event = await events.findOne({ _id: new ObjectId(id) })

    if (!event) return res.json({ error: "Event not found" })

    res.json(event)
  } catch (err) {
    res.json({ error: "Could not get event" })
  }
})

// CREATE event
router.post("/", async (req, res) => {
  try {
    const events = await getCollection("food-truckAPI", "Events")
    await events.insertOne(req.body)
    res.json({ message: "Event added successfully" })
  } catch (err) {
    res.json({ error: "Could not add event" })
  }
})

module.exports = router
