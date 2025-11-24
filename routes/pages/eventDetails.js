const router = require('express').Router()

router.get('/:id', (req, res) => {
    res.sendFile('event.html', { root: 'views' })
})

module.exports = router
