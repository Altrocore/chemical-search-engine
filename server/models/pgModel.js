const { pgPool } = require('../config/db');

const ChemicalElementPG = {
    // Create a new chemical element
    create: async (elementData) => {
        const query = `
            INSERT INTO chemical_elements (name, symbol, atomic_number, atomic_mass)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [elementData.name, elementData.symbol, elementData.atomic_number, elementData.atomic_mass];
        try {
            const result = await pgPool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating new element in PostgreSQL database:', error);
            throw error;
        }
    },

    // Read (get) a chemical element by ID
    getById: async (id) => {
        const query = 'SELECT * FROM chemical_elements WHERE id = $1;';
        const values = [id];
        try {
            const result = await pgPool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error reading element from PostgreSQL database:', error);
            throw error;
        }
    },

    // Update a chemical element
    update: async (id, elementData) => {
        const query = `
            UPDATE chemical_elements
            SET name = $1, symbol = $2, atomic_number = $3, atomic_mass = $4
            WHERE id = $5
            RETURNING *;
        `;
        const values = [elementData.name, elementData.symbol, elementData.atomic_number, elementData.atomic_mass, id];
        try {
            const result = await pgPool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error updating element in PostgreSQL database:', error);
            throw error;
        }
    },

    // Delete a chemical element
    delete: async (id) => {
        const query = 'DELETE FROM chemical_elements WHERE id = $1 RETURNING *;';
        const values = [id];
        try {
            const result = await pgPool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error deleting element from PostgreSQL database:', error);
            throw error;
        }
    },

    // Search for chemical elements
    search: async (searchTerm) => {
        const query = `
            SELECT * FROM chemical_elements
            WHERE 
                name ILIKE $1 OR
                symbol ILIKE $1 OR
                atomic_number::text ILIKE $1 OR
                atomic_mass::text ILIKE $1;
        `;
        const values = [`%${searchTerm}%`];
        try {
            const result = await pgPool.query(query, values);
            return result.rows;
        } catch (error) {
            console.error('Error querying PostgreSQL database:', error);
            throw error;
        }
    },
};

module.exports = ChemicalElementPG;
