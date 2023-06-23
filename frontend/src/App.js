import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Buy from './Buy';
import Sell from './Sell';
import Request from './Request'
import Requestform from './Requestform'
import Rent from './Rent';
import Cart from './Cart';
import Navbar from './Navbar';
import Profile from './Profile';

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
        <Route path="/request/*"
          element={
            <>
              <Navbar />
              <Request />
            </>
          }
        />
        <Route path="/cart/*"
          element={
            <>
              <Navbar />
              <Cart />
            </>
          }
        />
          <Route path="/requestform/*"
          element={
            <>
              <Navbar />
              <Requestform />
            </>
          }
        />
         <Route path="/profile/*"
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
