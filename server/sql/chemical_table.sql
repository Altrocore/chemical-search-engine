CREATE TABLE chemical_elements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    atomic_number INTEGER NOT NULL,
    atomic_mass DECIMAL NOT NULL
);
