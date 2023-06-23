const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.use(express.json());

router.post("/", async (req, res) => {
    const orderDetails = req.body;
    const newOrder = new Order(orderDetails);
  
    newOrder.save()
      .then(() => {
        res.status(200).json({ message: 'Order placed successfully!' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred while placing the order.' });
      });
  
});

router.get("/", async (req, res) => {
  const loggedInUsername = req.query.username;

  if (!loggedInUsername) {
    return res.status(400).json({ error: 'No username provided.' });
  }

  Order.find({ username: loggedInUsername })
    .then((orders) => {
      res.status(200).json({ orders: orders });
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while fetching the orders.' });
    });
});

module.exports = router;