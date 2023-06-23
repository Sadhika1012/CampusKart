import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';
import './buy.css';
import './Requestform.js';

const Buy = () => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [allImage, setAllImage] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    getImage();
  }, []);

  const getImage = () => {
    fetch("http://localhost:8080/api/products", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllImage(data.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredImages = allImage.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (item, action) => {
    addToCart({ item, action });
  };

  const isItemInCart = (itemId) => {
    return cartItems.some((item) => item.item._id === itemId);
  };

  return (
    <div>
      <div className="search-bar">
        <input type="text" placeholder="Search" onChange={handleSearch} />
        <Link to="/requestform" className="request-button">Request</Link>
      </div>
      <div className="image-container">
        <div className="image-grid">
      {filteredImages.map((data) => (
        <div key={data._id} className="image-item">
          <img width={100} height={100} src={data.image} alt="Product" />
          <p>Name: {data.name}</p>
          <p>Description: {data.description}</p>
          <p>Price: {data.price}</p>
          <div>
            {data.flag === 0 && (
              <button
                onClick={() => handleAddToCart(data, 'buy')}
                disabled={isItemInCart(data._id)}
              >
                Buy
              </button>
            )}
            {data.flag === 1 && (
              <button
                onClick={() => handleAddToCart(data, 'rent')}
                disabled={isItemInCart(data._id)}
              >
                Rent
              </button>
            )}
           
          </div>
        </div>
      ))}
    </div>
    </div>
    </div>
  );
};

export default Buy;
