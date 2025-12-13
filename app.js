const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
const port = 3000

app.use(express.json())

// static
app.use(express.static(path.join(__dirname, 'public')))

// API routes
app.use('/api/v1/menu', require('./routes/api/v1/menu'))
app.use('/api/v1/events', require('./routes/api/v1/event'))


app.use('/', require('./routes/static'))

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
)

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

