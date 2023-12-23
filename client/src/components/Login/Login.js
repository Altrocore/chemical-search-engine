import React, { useState } from "react";
import './Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signUpPassword !== repeatPassword) {
      console.error("Passwords don't match.");
      return;
    }
    if (signUpName === "") {
      console.error("Username cannot be empty.");
      return;
    }
    try {
      const response = await axios.post('/api/auth/signup', {
        username: signUpName,
        password: signUpPassword
      });
      console.log(response.data);
      navigate("/search");
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
         username, password 
      });
      console.log(response.data);
      navigate("/search");
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <div className="signUpbtn-wrapper">
        {!isSigningUp ?
          (<button onClick={() => setIsSigningUp(true)} 
          className="signUpbtn">
            Don't have account yet ? Click here to Sign Up
            </button>) : (
              <button onClick={() => setIsSigningUp(false)} 
              className="signUpbtn">
                Click here to go back to login form
                </button>)
    
        }
      </div>
      { !isSigningUp ? 
        (<div className="login-container">
          <h2>Login</h2>
          <form onSubmit={(e) => handleLogin(e)}>
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
        </div>) : (
          <div className="login-container">
          <h2>Sign Up</h2>
          <form onSubmit={(e) => handleSignup(e)}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input 
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)} 
                type="text" id="username" 
                name="username" required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input 
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                type="password" 
                id="password" 
                name="password" required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Repeat password:</label>
              <input 
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
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
    </div>
  )
}

export default Login;