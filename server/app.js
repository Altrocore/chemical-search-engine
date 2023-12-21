const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./config/db');
const morgan = require('morgan');
const passport = require('passport');
require('./config/passport')(passport);

const authRoutes = require('./routes/authRoutes');

const app = express();

const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use(morgan('combined'));

// Import routes
const searchRoutes = require('./routes/searchRoutes');

// Use routes
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ success: true, msg: 'You are successfully authenticated to this route!' });
});

module.exports = app;
