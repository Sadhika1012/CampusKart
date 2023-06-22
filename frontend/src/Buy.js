import React, { useState, useEffect } from 'react';

const Buy = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const imageFilenames = [
    'ardinuo1.jpg', // Product 1 image
    'calci1.jpg', // Product 2 image
    'crayon1.jpg',
    'labcoat1.jpg' // Product 3 image
  ];

  return (
    <div>
      <h1>Product List</h1>
      {products.map((product, index) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <img
  src={`/images/${imageFilenames[index % imageFilenames.length]}`}
  alt={`Image ${index + 1}`}
  width="200"
  height="200"
/>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <div>
            {product.flag === 0 && <button>Buy</button>}
            {product.flag === 1 && <button>Rent</button>}
            {product.flag === 2 && (
              <div>
                <button>Buy</button>
                <button>Rent</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Buy;
