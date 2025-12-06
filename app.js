const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

// static assets (images, css, js)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/v1/menu', require('./routes/api/v1/menu'));
app.use('/api/v1/events', require('./routes/api/v1/event'));

// STATIC HTML ROUTES
app.use('/', require('./routes/static'));

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
