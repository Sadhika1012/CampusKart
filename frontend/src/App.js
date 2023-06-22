import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Buy from './Buy';
import Sell from './Sell';
import Rent from './Rent';
import Cart from './Cart';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/*"element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/buy/*" element={
            <>
              <Navbar />
              <Buy />
            </>
          }
        />
        <Route path="/sell/*"
          element={
            <>
              <Navbar />
              <Sell />
            </>
          }
        />
        <Route path="/rent/*"
          element={
            <>
              <Navbar />
              <Rent />
            </>
          }
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
