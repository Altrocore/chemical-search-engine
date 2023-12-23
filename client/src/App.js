import React from 'react';
import SearchComponent from './components/Search/SearchComponent';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>,
    },
    {
      path: "/search",
      element:  
        <>
            <Header></Header>
            <SearchComponent />
        </>,    
    },
  ]);
  

function App() {
    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
