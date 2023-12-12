import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
    const [term, setTerm] = useState('');
    const [database, setDatabase] = useState('both'); 
    const [results, setResults] = useState({ postgresResults: [], mongoResults: [] });

    const onSearch = async () => {
        try {
            console.log(`Searching for: ${term} in ${database}`); 
            const response = await axios.get(`/api/search`, { 
                params: { term, database } 
            });
            console.log(response.data); 
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching search results", error);
            setResults({ postgresResults: [], mongoResults: [] });
        }
    };

    return (
        <div>
            <input type="text" value={term} onChange={e => setTerm(e.target.value)} />
            <select value={database} onChange={e => setDatabase(e.target.value)}>
                <option value="both">Both</option>
                <option value="postgres">PostgreSQL</option>
                <option value="mongodb">MongoDB</option>
            </select>
            <button onClick={onSearch}>Search</button>
            <div>
                {results.postgresResults.length > 0 || results.mongoResults.length > 0 ? (
                    <ul>
                        {results.postgresResults.map((result, index) => (
                            <li key={`pg-${index}`}>
                                <div>Name: {result.name}</div>
                                <div>Symbol: {result.symbol}</div>
                                <div>Atomic Number: {result.atomic_number}</div>
                                <div>Atomic Mass: {result.atomic_mass}</div> 
                            </li>
                        ))}
                        {results.mongoResults.map((result, index) => (
                            <li key={`mongo-${index}`}>
                                <div>Name: {result.name}</div>
                                <div>Symbol: {result.symbol}</div>
                                <div>Atomic Number: {result.atomic_number}</div> 
                                <div>Atomic Mass: {result.atomic_mass}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>No results found</div>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;
