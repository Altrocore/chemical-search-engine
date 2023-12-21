import React, { useState, useEffect } from "react";
import './ResultsComponent.css'

const ResultsComponent = ({ results }) => {

    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedPg, setSortedPg] = useState([]);
    const [sortedMongo, setSortedMongo] = useState([]);

    const sortElements = (value) => {
        
        if (results.postgresResults.length > 0) {

            const sortedElements = [...results.postgresResults].sort((a, b) => {
            // Toggle sorting order based on the current sortOrder state
            const order = sortOrder === 'desc' ? 1 : -1;
            console.log(sortOrder)
            return order * a[value].localeCompare(b[value]);
            });
            
            setSortedPg(sortedElements);
        }
        if (results.mongoResults.length > 0) {

            const sortedElements = [...results.mongoResults].sort((a, b) => {
            // Toggle sorting order based on the current sortOrder state
            const order = sortOrder === 'desc' ? 1 : -1;
            console.log(sortOrder)
            return order * a[value].localeCompare(b[value]);
            });
            
            setSortedMongo(sortedElements);
        }
        
        // Toggle the sortOrder state for the next click
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        // Check if the elementsProp has changed using deep-equal
        sortElements("name")
    }, [results.postgresResults, results.mongoResults]);

    const sortByMass = () => {
        if (results.postgresResults.length > 0) {
            const sortedElements = [...results.postgresResults].sort((a, b) => {
                // Toggle sorting order based on the current sortOrder state
                const numA = parseFloat(a.atomic_mass);
                const numB = parseFloat(b.atomic_mass);
                console.log(sortOrder)
                if (sortOrder === 'desc') {
                    return numA - numB;
                } else {
                    return numB - numA;
                }
            });
            
            setSortedPg(sortedElements);
        } 
        if (results.mongoResults.length > 0) {
            const sortedElements = [...results.mongoResults].sort((a, b) => {
                // Toggle sorting order based on the current sortOrder state
                const numA = parseFloat(a.atomic_mass);
                const numB = parseFloat(b.atomic_mass);
                console.log(sortOrder)
                if (sortOrder === 'desc') {
                    return numA - numB;
                } else {
                    return numB - numA;
                }
            });
            
            setSortedMongo(sortedElements);
        }
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    const sortByAtomicNumber = () => {

        if (results.postgresResults.length > 0) {
            const sortedElements = [...results.postgresResults].sort((a, b) => {
                // Toggle sorting order based on the current sortOrder state
            
                if (sortOrder === 'desc') {
                    return a.atomic_number - b.atomic_number;
                } else {
                    return b.atomic_number - a.atomic_number;
                }
            });
                
            setSortedPg(sortedElements);
        }
        console.log("asdasd")
        if (results.mongoResults.length > 0) {
            const sortedElements = [...results.mongoResults].sort((a, b) => {
                // Toggle sorting order based on the current sortOrder state
                
                if (sortOrder === 'desc') {
                    return a.atomic_number - b.atomic_number;
                } else {
                    return b.atomic_number - a.atomic_number;
                }
            });
            
            setSortedMongo(sortedElements);
        }
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    return (
        <div id="results-container">
        {results.postgresResults.length > 0 || results.mongoResults.length > 0 ? (
        
            <ul className="results-list">
                <h2 className="el-header-container">
                    <span className="el-name" onClick={() => sortElements("name")}> Name </span> 
                    <span className="el-symbol" onClick={() => sortElements("symbol")}> Symbol </span> 
                    <span className="el-at-number" onClick={() => sortByAtomicNumber()}> Atomic number </span> 
                    <span className="el-at-mass" onClick={() => sortByMass("atomic_mass")}> Atomic mass </span> 
                </h2>
                { results.postgresResults.length > 0 && 
                    <>
                        <h2 className="header-title title-mongo">PostgreSQL results:</h2>
                        {sortedPg.map((result) => (
                            <li key={result.id || result._id} className="results-list-item">
                                <span className="el-name">{ result.name }</span> 
                                <span className="el-symbol">{ result.symbol }</span> 
                                <span className="el-at-number">{ result.atomic_number }</span> 
                                <span className="el-at-mass">{ result.atomic_mass }</span> 
                            </li>
                        ))}
                    </>
                }
                {results.mongoResults.length > 0 && 
                    <>
                        <h2 className="header-title title-mongo">MongoDB results:</h2>
                            {sortedMongo.map((result) => (
                                <li key={result.id || result._id} className="results-list-item">
                                    <span className="el-name">{ result.name }</span> 
                                    <span className="el-symbol">{ result.symbol }</span> 
                                    <span className="el-at-number">{ result.atomic_number }</span> 
                                    <span className="el-at-mass">{ result.atomic_mass }</span> 
                                </li>
                            ))}
                    </>
                }
            </ul>
            
        ) : (
            <h3 className="no-results">No results to show</h3>
        )}
        </div>
    )
}

export default ResultsComponent;