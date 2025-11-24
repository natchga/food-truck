const router = require('express').Router()
const menuController = require('../../../controllers/menuController')

// GET all menu items
router.get('/', menuController.getMenu)

// GET menu by ID
router.get('/:id', menuController.getMenuById)

// POST create menu item
router.post('/', menuController.createMenuItem)

module.exports = router
