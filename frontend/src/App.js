import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Buy from './Buy';
import Sell from './Sell';
import Rent from './Rent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/buy" element={<Buy/>}/>
        <Route path="/sell" element={<Sell/>}/>
        <Route path="/rent" element={<Rent/>}/>
      </Routes>
    </Router>
  );
}

export default App;
