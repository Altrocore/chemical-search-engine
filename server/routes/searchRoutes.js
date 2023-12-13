const express = require('express');
require('dotenv').config(); // Убедитесь, что это вызывается перед использованием process.env
const ChemicalElementPG = require('../models/pgModel');
const ChemicalElementMongo = require('../models/mongoModel');
const logger = require('../logs/logger');

const router = express.Router();

router.get('/', async (req, res) => {
    const { term, database } = req.query;

    try {
        let pgResults = [];
        let mongoResults = [];

        // Для числового поиска используем только если term является числом
        const searchTermNumber = !isNaN(term) ? Number(term) : null;

        // PostgreSQL search
        if (database === 'postgres' || database === 'both') {
            pgResults = await ChemicalElementPG.search(term, !isNaN(term));
        }

        // MongoDB search
        if (database === 'mongodb' || database === 'both') {
            mongoResults = await ChemicalElementMongo.search(term);
            logger.info("MongoDB Query Results:", mongoResults);
        }

        res.json({
            postgresResults: pgResults,
            mongoResults: mongoResults
        });
    } catch (error) {
        logger.error('Error during search:', error);
        res.status(500).json({
            message: 'Error during search',
            error: error.message, // Лучше использовать error.message для информации о типе ошибки
        });
    }
});

module.exports = router;
