const express = require("express");
const router = express.Router();
const { getCollection, ObjectId } = require('../../../config/db');


// GET all events
router.get("/", async (req, res) => {
    try {
        const events = await getCollection("food-truckAPI", "Events");
        const data = await events.find().toArray();
        res.json(data);
    } catch (err) {
        console.error("EVENT LIST ERROR:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// GET event by ID
router.get("/:id", async (req, res) => {
    try {
        const events = await getCollection("food-truckAPI", "Events");
        const id = req.params.id;

        const event = await events.findOne({ _id: new ObjectId(id) });

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json(event);

    } catch (err) {
        console.error("EVENT ERROR:", err);
        res.status(500).json({ error: "Server error" });
    }
});
router.post("/", async (req, res) => {
    try {
        const events = await getCollection("food-truckAPI", "Events");
        await events.insertOne(req.body);
        res.json({ message: "Event added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
