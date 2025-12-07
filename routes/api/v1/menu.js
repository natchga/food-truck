const express = require("express")
const router = express.Router()
const { getCollection, ObjectId } = require('../../../config/db')

// all menu
router.get("/", async (req, res) => {
  try {
    const col = await getCollection("food-truckAPI", "Menu")
    const items = await col.find().toArray()
    res.json(items)
  } catch (err) {
    console.error("MENU ERROR:", err)
    res.json({ error: "Could not load menu" })
  }
})

// use number
router.get("/number/:number", async (req, res) => {
  try {
    const num = parseInt(req.params.number)
    const col = await getCollection("food-truckAPI", "Menu")
    const item = await col.findOne({ number: num })

    if (!item) {
      return res.json({ error: "Item not found" })
    }

    res.json(item)
  } catch (err) {
    console.error("MENU FIND ERROR:", err)
    res.json({ error: "Could not load item" })
  }
})

// menu by id
router.get("/:id", async (req, res) => {
  try {
    const col = await getCollection("food-truckAPI", "Menu")
    const item = await col.findOne({ _id: new ObjectId(req.params.id) })

    if (!item) {
      return res.json({ error: "Item not found" })
    }

    res.json(item)
  } catch (err) {
    console.error("MENU ID LOOKUP ERROR:", err)
    res.json({ error: "Invalid ID format" })
  }
})

// add item
router.post("/", async (req, res) => {
  try {
    const col = await getCollection("food-truckAPI", "Menu")

    // try safer .body 
    const item = {
      name: req.body.name || "",
      Description: req.body.Description || "",
      Price: req.body.Price || "",
      Image: req.body.Image || ""
    }

    await col.insertOne(item)

    res.json({ message: "Menu item added successfully" })

  } catch (err) {
    console.error("MENU ADD ERROR:", err)
    res.json({ error: "Could not add menu item" })
  }
})

module.exports = router;
