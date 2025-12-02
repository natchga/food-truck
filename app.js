const express = require('express')
const colors = require('ansi-colors')
const app = express()
require('dotenv').config()


// DB connection
require('./config/db')()

// middleware
app.use(express.json())
app.use(express.static('public'))


// API routes
app.use('/api/v1/menu', require('./routes/api/v1/menu'))
app.use('/api/v1/events', require('./routes/api/v1/events'))

// page routes
app.use('/', require('./routes/pages/home'))
app.use('/event', require('./routes/pages/eventDetails'))
app.use('/admin', require('./routes/pages/admin'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
    console.log(colors.green(`Server running on port ${PORT}`))
)
