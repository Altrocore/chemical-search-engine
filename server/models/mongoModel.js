const mongoose = require('mongoose');
const logger = require('../logs/logger');

// Mongoose Schema for Chemical Elements
const chemicalElementSchema = new mongoose.Schema({
    name: { type: String, required: true },             
    symbol: { type: String, required: true },           
    atomic_number: { type: Number, required: true },    
    atomic_mass: { type: Number, required: true },      
}, { collection: 'elements' });

const ChemicalElementMongo = mongoose.model('ChemicalElement', chemicalElementSchema);

const ChemicalElementMongoOperations = {
    create: async (elementData) => {
        try {
            const element = new ChemicalElementMongo(elementData);
            return await element.save();
        } catch (error) {
            logger.error('Error creating new element in MongoDB:', error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            return await ChemicalElementMongo.findById(id);
        } catch (error) {
            logger.error('Error reading element from MongoDB:', error);
            throw error;
        }
    },
    update: async (id, elementData) => {
        try {
            return await ChemicalElementMongo.findByIdAndUpdate(id, elementData, { new: true });
        } catch (error) {
            logger.error('Error updating element in MongoDB:', error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            return await ChemicalElementMongo.findByIdAndDelete(id);
        } catch (error) {
            logger.error('Error deleting element from MongoDB:', error);
            throw error;
        }
    },
    search: async (searchTerm) => {
        try {
            const regexQuery = { $regex: searchTerm, $options: 'i' };
            const mongoQuery = {
                $or: [
                    { name: regexQuery },
                    { symbol: regexQuery }
                ]
            };

            if (!isNaN(searchTerm)) {
                const numericTerm = Number(searchTerm);
                mongoQuery.$or.push({ atomic_number: numericTerm });
                mongoQuery.$or.push({ atomic_mass: numericTerm });
            }

            logger.info("Executing MongoDB Query:", JSON.stringify(mongoQuery, null, 2));
            const results = await ChemicalElementMongo.find(mongoQuery).lean();
            logger.info("MongoDB Search Results:", JSON.stringify(results, null, 2));
            return results;
        } catch (error) {
            logger.error('Error querying MongoDB:', error);
            throw error;
        }
    }
};

module.exports = ChemicalElementMongoOperations;
