import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './profile.css';

const Profile = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const loggedInUsername = localStorage.getItem('username');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/orders/${loggedInUsername}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const orders = data.order;

          if (orders && orders.length > 0) {
            setOrderDetails(orders[0]);
          } else {
            setOrderDetails({});
          }
        } else {
          console.error('Failed to fetch order details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [loggedInUsername]);

  const containerClasses = classNames('profile-container');
  const orderDetailsClasses = classNames('order-details', {
    'has-buy-items': orderDetails.buyItems && orderDetails.buyItems.length > 0,
    'has-rent-items': orderDetails.rentItems && orderDetails.rentItems.length > 0,
  });

  return (
    <div className={containerClasses}>
      <h1>Profile</h1>
      {Object.keys(orderDetails).length > 0 ? (
        <div className={orderDetailsClasses}>
          <h2>Order Details:</h2>
          {orderDetails.buyItems && orderDetails.buyItems.length > 0 && (
            <div>
              <p>
                Buy Items: {orderDetails.buyItems.map((item) => item.item.name).join(', ')}
              </p>
              <ul>
                {orderDetails.buyItems.map((item) => (
                  <li key={item.item._id}>{item.item.name}</li>
                ))}
              </ul>
            </div>
          )}
          {orderDetails.rentItems && orderDetails.rentItems.length > 0 && (
            <div>
              <p>
                Rent Items: {orderDetails.rentItems.map((item) => item.item.name).join(', ')}
              </p>
              <ul>
                {orderDetails.rentItems.map((item) => (
                  <li key={item.item._id}>{item.item.name}</li>
                ))}
              </ul>
            </div>
          )}
          <p>Total Buy Price: {orderDetails.totalBuyPrice}</p>
          <p>Total Rent Price: {orderDetails.totalRentPrice}</p>
          <p>Username: {orderDetails.username}</p>
        </div>
      ) : (
        <p>No order details available.</p>
      )}
    </div>
  );
};

export default Profile;
