import React from "react";
import './Login.css';

const Login = () => {

  return (
    <div class="login-container">
      <h2>Login</h2>
      <form>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required/>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required/>
        </div>
        <div class="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login;