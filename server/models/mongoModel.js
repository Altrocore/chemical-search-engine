const mongoose = require('mongoose');

// Mongoose Schema for Chemical Elements
const chemicalElementSchema = new mongoose.Schema({
    name: String,             // Name of the element
    symbol: String,           // Symbol of the element
    atomic_number: Number,    // Atomic number 
    atomic_mass: Number,      // Atomic mass
});

// Mongoose model
const ChemicalElementMongo = mongoose.model('ChemicalElement', chemicalElementSchema);

const ChemicalElementMongoOperations = {
    // Create a new chemical element
    create: async (elementData) => {
        try {
            const element = new ChemicalElementMongo(elementData);
            return await element.save();
        } catch (error) {
            console.error('Error creating new element in MongoDB:', error);
            throw error;
        }
    },

    // Get a chemical element by ID
    getById: async (id) => {
        try {
            return await ChemicalElementMongo.findById(id);
        } catch (error) {
            console.error('Error reading element from MongoDB:', error);
            throw error;
        }
    },

    // Update a chemical element
    update: async (id, elementData) => {
        try {
            return await ChemicalElementMongo.findByIdAndUpdate(id, elementData, { new: true });
        } catch (error) {
            console.error('Error updating element in MongoDB:', error);
            throw error;
        }
    },

    // Delete a chemical element
    delete: async (id) => {
        try {
            return await ChemicalElementMongo.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting element from MongoDB:', error);
            throw error;
        }
    },

    // Search for chemical elements
    search: async (searchTerm) => {
        try {
            const regexQuery = { $regex: searchTerm, $options: 'i' };
            const mongoQuery = { $or: [
                { name: regexQuery },
                { symbol: regexQuery }
            ]};
    
            const searchTermNumber = !isNaN(searchTerm) ? Number(searchTerm) : null;
            if (searchTermNumber !== null) {
                mongoQuery.$or.push({ atomic_number: searchTermNumber });
                mongoQuery.$or.push({ atomic_mass: searchTermNumber });
            }
    
            return await ChemicalElementMongo.find(mongoQuery);
        } catch (error) {
            console.error('Error querying MongoDB:', error);
            throw error;
        }
    }
};

module.exports = ChemicalElementMongoOperations;
