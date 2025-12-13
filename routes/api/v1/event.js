const express = require("express");
const router = express.Router();
const { getCollection, ObjectId } = require('../../../config/db');

router.get("/", async (req, res) => {
  try {
    const col = await getCollection("food-truckAPI", "Events");
    const events = await col.find().toArray();
    res.json(events);
  } catch (err) {
    console.error("EVENT LIST ERROR:", err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const col = await getCollection("food-truckAPI", "Events");
    const event = await col.findOne({ _id: new ObjectId(req.params.id) });

    if (!event) return res.json({ error: "Event not found" });

    res.json(event);
  } catch (err) {
    console.error("EVENT ERROR:", err);
  }
});

//add event
router.post("/", async (req, res) => {
  try {
    const col = await getCollection("food-truckAPI", "Events");
    await col.insertOne(req.body);
    res.json({ message: "Event added successfully" });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
