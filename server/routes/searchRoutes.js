const express = require('express');
const ChemicalElementPG = require('../models/pgModel');
const ChemicalElementMongo = require('../models/mongoModel');

const router = express.Router();

// Search endpoint
router.get('/', async (req, res) => {
    const { term, database } = req.query;

    try {
        let pgResults = [];
        let mongoResults = [];

        const searchTermNumber = isNaN(term) ? null : Number(term);
        const searchQueryNumeric = searchTermNumber !== null;

        // PostgreSQL search
        if (database === 'postgres' || database === 'both') {

            pgResults = await ChemicalElementPG.search(term, searchQueryNumeric);
        }

        // MongoDB search
        if (database === 'mongodb' || database === 'both') {
            mongoResults = await ChemicalElementMongo.search(term);
            console.log("MongoDB Query Results: ", mongoResults);
        }

        res.json({
            postgresResults: pgResults,
            mongoResults: mongoResults
        });
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).send('Error during search');
    }
});

module.exports = router;
