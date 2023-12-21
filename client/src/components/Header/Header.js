import React from "react";
import './Header.css';

const Header = () => {

  return (
    <div className="header-container">
        <h1>Search App</h1>
        <h3>
          <span>This is a chemical elements search app. 
          You can search for elements by their name, 
          by their symbol, by their atomic number, or atomic mass.</span>
          <br/>
          <span>You can search in both databases or choose one of them.</span>
          <br/>
          <span>You can sort results by clicking on the name of the column in the search results.</span> 
      </h3>

    </div>
  )
}

export default Header;