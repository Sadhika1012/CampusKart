// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; 

function Login() {
  const [collegeId, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // login logic 
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-details">
        <h2 className="login-heading">LOGIN</h2>
        <label className="login-label">College Id:</label>
        <input
          type="text"
          className="login-input"
          placeholder="Enter ID"
          value={collegeId}
          onChange={(e) => setCollegeId(e.target.value)}
          required
        />
        <label className="login-label">Password:</label>
        <input
          type="password"
          className="login-input"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
      <div className="login-image">
      <img src={require('./img/logo-png.png')} alt="Login" />
      </div>
    </div>
  );
}

export default Login;
