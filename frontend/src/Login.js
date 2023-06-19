import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [collegeId, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // login logic 
    navigate('/home');
  };

  return (
    <div>
      <h2>LOGIN</h2>
      <label>College Id:</label>
      <input
        type="text"
        placeholder="Enter ID"
        value={collegeId}
        onChange={(e) => setCollegeId(e.target.value)}
        required
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
