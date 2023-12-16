import React from 'react';
import SearchComponent from './components/Search/SearchComponent';
import './App.css';
import Header from './components/Header/Header';

function App() {
    return (
        <div className="App">
            <Header></Header>
            <SearchComponent />
        </div>
    );
}

export default App;
