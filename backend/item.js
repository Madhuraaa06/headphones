// itemSchema.js
const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  rating: Number,
  imgUrl: String,
});


const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
