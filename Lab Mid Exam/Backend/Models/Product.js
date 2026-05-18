const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  stock: { type: Number, required: true, min: 0 },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
