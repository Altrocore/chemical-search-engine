import React, { useState } from "react";
import './Login.css';
import axios from "axios";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Make a signup request to the server
    axios.post('http://localhost:3001/api/signup', { 
        params: { username, password } 
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error.response.data);
      });
  };

  const handleLogin = () => {
    // Make a login request to the server
    axios.post('/api/login', { username, password })
      .then(response => {
        console.log(response.data);
        // Handle success, maybe store the token in local storage or a cookie
      })
      .catch(error => {
        console.error(error.response.data);
        // Handle error, maybe show an error message to the user
      });
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={(e) => handleSignup(e)}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input 
            value={username}
            onChange={(e) => handleUsernameChange(e)} 
            type="text" id="username" 
            name="username" required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            value={password}
            onChange={(e) => handlePasswordChange(e)}
            type="password" 
            id="password" 
            name="password" required
          />
        </div>
        <div className="form-group">
          <button type="submit" >Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login;