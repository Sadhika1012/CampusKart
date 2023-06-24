import React, { useState } from 'react';
import './sellform.css';

const Seller = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [sellType, setSellType] = useState('');
  const [category, setCategory] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    convertImageToBase64(file);
  };

  const convertImageToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSellTypeChange = (e) => {
    setSellType(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let flag = 2; // Default flag value if no sell type is selected

    if (sellType === 'buy') {
      flag = 0;
    } else if (sellType === 'rent') {
      flag = 1;
    }

    const productData = {
      name: name,
      description: description,
      price: price,
      image: image,
      flag: flag,
      category: category,
    };

    fetch('http://localhost:8080/api/sells', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Product added successfully:', data);
        // Perform any additional actions or show success message
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        // Show error message
      });
  };

  return (
    <div className="seller-container">
      <h2>Sell an Item</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} required />

        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={handleDescriptionChange} required />

        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={handlePriceChange} required />

        <label htmlFor="sellType">Sell Type:</label>
        <select id="sellType" value={sellType} onChange={handleSellTypeChange} required>
          <option value="">Select Sell Type</option>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
          <option value="both">Both</option>
        </select>

        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={handleCategoryChange} required>
          <option value="">Select Category</option>
          <option value="Casual Stationery">Casual Stationery</option>
          <option value="Lab Equipments">Lab Equipments</option>
          <option value="Electronics">Electronics</option>
        </select>

        <label htmlFor="image">Image:</label>
        <input type="file" id="image" onChange={handleImageChange} accept="image/*" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Seller;
