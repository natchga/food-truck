const router = require('express').Router()

router.get('/', (req, res) => {
    res.sendFile('admin.html', { root: 'views' })
})

module.exports = router
