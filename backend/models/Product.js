const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  data: {
    type: Buffer,
  },
  description: String,
  price: String,
  flag: Number, 
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;

  