import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
      <h2>Home</h2>
      <ul style={{display:"inline"}}>
        <li>
          <Link to="/buy">Buy products</Link>
        </li>      
        <li>
          <Link to="/sell">Sell Products</Link>
        </li>
        <li>
          <Link to="/rent">Rent Products</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
