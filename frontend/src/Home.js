import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import add from './img/add-png.png';
import backgroundImage from './img/background10.jpg';

function Home() {
  return (
    <div className="page-container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + backgroundImage})` }}>
      <ul className='navbar'>
        <li className='li1'>
          <Link to="/buy">Buy products</Link>
        </li>      
        <li className='li1'>
          <Link to="/sell">Sell Products</Link>
        </li>
        <li className='li1'>
          <Link to="/rent">Rent Products</Link>
        </li>
        <li>
          <Link to="/cart">
            <img className='img1' src={add} alt="cart" />
          </Link>
        </li>
      </ul>
      <div className="white-box">
      <div className="text-content">
        
        <h2>"A blank page is an opportunity.<br></br><br></br>Fill it with ideas, dreams,<br></br> <br></br>and inspiration..."</h2>
        <br></br>
        <div class="container">
  <button class="get-started"><h2>Get Started</h2></button>
</div>

        {/* Add more HTML elements or components as needed */}
      </div>

        <div className="side-image"></div>
      </div>
    </div>
  );
}

export default Home;
