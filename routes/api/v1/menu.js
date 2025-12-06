const express = require("express");
const router = express.Router();
const { getCollection, ObjectId } = require('../../../config/db');

// GET all menu items
router.get("/", async (req, res) => {
    try {
        const col = await getCollection("food-truckAPI", "Menu");
        const items = await col.find().toArray();
        res.json(items);
    } catch (err) {
        console.error("MENU ERROR:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// GET menu item by number
router.get("/number/:number", async (req, res) => {
    try {
        const num = parseInt(req.params.number);
        const col = await getCollection("food-truckAPI", "Menu");
        const item = await col.findOne({ number: num });

        if (!item) return res.status(404).json({ error: "Item not found" });

        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// GET menu item by ID
router.get("/:id", async (req, res) => {
    try {
        const col = await getCollection("food-truckAPI", "Menu");
        const item = await col.findOne({ _id: new ObjectId(req.params.id) });
        if (!item) return res.status(404).json({ error: "Item not found" });
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Invalid ID format" });
    }
});

// POST create menu item
router.post("/", async (req, res) => {
    try {
        const col = await getCollection("food-truckAPI", "Menu");
        await col.insertOne(req.body);
        res.json({ message: "Menu item added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
