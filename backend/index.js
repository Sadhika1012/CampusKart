const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const loginsRouter = require('./routes/logins');
const ordersRouter=require('./routes/orders');
const productsRouter = require('./routes/products');
const bodyParser = require('body-parser');
const requestsRouter = require('./routes/requests');
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/CampusKart", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => console.log(err));

app.use('/api/logins', loginsRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders',ordersRouter);
app.use('/api/requests',requestsRouter);

app.listen(8080, () => {
  console.log('Backend running and server up and running at 8080!');
});
