import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './CartContext';
import './buy.css';

const Buy = () => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [allImage, setAllImage] = useState([]);

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

  const handleAddToCart = (item, action) => {
    addToCart({ item, action });
  };

  const isItemInCart = (itemId) => {
    return cartItems.some((item) => item.item._id === itemId);
  };

  return (
    <div className="auth-wrapper" style={{ height: '200vh' }}>
      {allImage.map((data) => (
        <div key={data._id} style={{ marginBottom: '20px' }}>
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
            {data.flag === 2 && (
              <div>
                <button onClick={() => handleAddToCart(data)} disabled={isItemInCart(data._id)}>
                  Buy
                </button>
                <button
                  onClick={() => handleAddToCart(data, 'rent')}
                  disabled={isItemInCart(data._id)}
                >
                  Rent
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Buy;
