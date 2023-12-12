const { Pool } = require('pg');
const mongoose = require('mongoose');
require('dotenv').config();

const logger = require('../logs/logger');
// PostgreSQL Connection Setup
const pgConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
};

const pgPool = new Pool(pgConfig);

pgPool.on('connect', () => {
    console.log('Connected to PostgreSQL Database');
});


// MongoDB Connection Setup
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri);

const mongoDb = mongoose.connection;

// MongoDB Error Handling
mongoDb.on('error', (error) => {
    logger.error(`MongoDB connection error: ${error}`);
});

// Successful MongoDB Connection
mongoDb.once('open', () => {
    console.log('Connected to MongoDB Database');
});

module.exports = { pgPool, mongoDb };
