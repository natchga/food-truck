const MenuItem = require('../models/MenuItem')

module.exports = {
    getMenu: async (req, res) => {
        const items = await MenuItem.find()
        res.json(items)
    },

    getMenuById: async (req, res) => {
        const item = await MenuItem.findById(req.params.id)
        res.json(item)
    },

    createMenuItem: async (req, res) => {
        const newItem = await MenuItem.create(req.body)
        res.json(newItem)
    }
}
