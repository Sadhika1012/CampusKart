const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const loginsRouter = require('./routes/logins');

dotenv.config();

const app = express();
app.use(cors());
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
app.listen(8080, () => {
  console.log('Backend running and server up and running at 8080!');
});
