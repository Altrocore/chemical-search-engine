const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./config/db');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan('combined'));

// Import routes
const searchRoutes = require('./routes/searchRoutes');

// Use routes
app.use('/api/search', searchRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = app;
