import React, { useContext, useState,useEffect } from 'react';
import { CartContext } from './CartContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addMonths } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeItemFromCart, clearCart } = useContext(CartContext);
  const [rentalDurations, setRentalDurations] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false); 
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    setLoggedInUsername(username);
  }, []);

  const buyItems = cartItems.filter((item) => item.action === 'buy');
  const rentItems = cartItems.filter((item) => item.action === 'rent');

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + parseFloat(item.item.price), 0);
  };

  const totalBuyPrice = calculateTotalPrice(buyItems);
  const totalRentPrice = calculateTotalPrice(rentItems);

  const handleRemoveItem = (itemId) => {
    removeItemFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleDurationChange = (itemId, startDate, endDate) => {
    setRentalDurations((prevDurations) => ({
      ...prevDurations,
      [itemId]: { startDate, endDate },
    }));
  };

  const getDurationForItem = (itemId) => {
    return rentalDurations[itemId] || null;
  };

  const handlePlaceOrder = () => {
    // Collect order details here
    const orderDetails = {
      buyItems,
      rentItems,
      totalBuyPrice,
      totalRentPrice,
      username: loggedInUsername,
    };
  
    // Send the order details to the server
    fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Order placed successfully!
        setOrderPlaced(true);
        navigate('/profile', { state: { orderDetails } });
      })
      .catch((error) => {
        console.error('An error occurred while placing the order:', error);
        // Handle error state
      });
  };
  

  

  return (
    <div style={{ marginTop: '200px' }}>
      <h2>Cart</h2>
      <h3>Buy:</h3>
      {buyItems.map((item) => (
        <div key={item.item._id}>
          <img src={item.item.image} alt={item.item.name} style={{ width: '100px', height: '100px' }} />
          <p>Name: {item.item.name}</p>
          <p>Price: {item.item.price}</p>
          <button onClick={() => handleRemoveItem(item.item._id)}>Remove</button>
        </div>
      ))}
      <p>Total Buy Price: {totalBuyPrice}</p>
  
      <h3>Rent:</h3>
      {rentItems.map((item, index) => (
        <div key={`${item.item._id}_${index}`}>
          <img src={item.item.image} alt={item.item.name} style={{ width: '100px', height: '100px' }} />
          <p>Name: {item.item.name}</p>
          <p>Price: {item.item.price}</p>
          <label htmlFor={`startDate_${item.item._id}_${index}`}>Duration:</label>
          <input
            type="text"
            id={`startDate_${item.item._id}_${index}`}
            value={getDurationForItem(item.item._id)?.startDate || new Date().toISOString().split('T')[0]} // Set initial value to current date if no duration is selected
            onChange={(e) => handleDurationChange(item.item._id, e.target.value, getDurationForItem(item.item._id)?.endDate)}
          />
          <DatePicker
            id={`endDate_${item.item._id}_${index}`}
            selected={getDurationForItem(item.item._id)?.endDate || null}
            onChange={(date) => handleDurationChange(item.item._id, getDurationForItem(item.item._id)?.startDate, date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            minDate={new Date()} // Set minDate to current date
            maxDate={addMonths(new Date(), 1)} // Set maxDate to one month from current date
          />
          <button onClick={() => handleRemoveItem(item.item._id)}>Remove</button>
        </div>
      ))}
      <p>Total Rent Price: {totalRentPrice}</p>
      <p>Total Price: {totalBuyPrice + totalRentPrice}</p>
      {!orderPlaced && (
        <button onClick={handlePlaceOrder}>Place Order</button>
      )}
      {orderPlaced && <p>Order has been placed successfully!</p>}
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
  
};

export default Cart;
