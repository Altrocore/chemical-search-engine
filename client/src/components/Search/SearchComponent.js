import React, { useState } from 'react';
import axios from 'axios';
import ResultsComponent from '../Result/ResultsComponent';
import './SearchComponent.css';

const SearchComponent = () => {
    const [term, setTerm] = useState('');
    const [database, setDatabase] = useState('both'); 
    const [results, setResults] = useState({ postgresResults: [], mongoResults: [] });
    const [error, setError] = useState('');

    const onSearch = async () => {
        setError('');
        console.log(`Searching for: ${term} in ${database}`);
        try {
            const response = await axios.get(`/api/search`, { 
                params: { term, database } 
            });
            console.log('Search response:', response.data); 
            setResults(response.data);
            console.log(results)
        } catch (error) {
            console.error("Error fetching search results", error);
            setError('Failed to fetch search results');
            setResults({ postgresResults: [], mongoResults: [] });
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setTerm(event.target.value)
            onSearch();
        }
    };

    return (
        <div id="search-container">
            <div className='search-wrapper'>
                <input
                    type="text"
                    value={term}
                    onKeyUp={(e) => handleKeyPress(e)}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search for an element..."
                    id="search-input"
                />
                <select value={database} onChange={(e) => setDatabase(e.target.value)} id="search-select">
                    <option value="both">Both</option>
                    <option value="postgres">PostgreSQL</option>
                    <option value="mongodb">MongoDB</option>
                </select>
                <button onClick={onSearch} id="search-button">
                    Search
                </button>

                {error && <div id="error-message">{error}</div>}

            </div>
            <ResultsComponent results={results}></ResultsComponent>
        </div>
    );
};

export default SearchComponent;
