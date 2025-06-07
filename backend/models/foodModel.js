const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },           // Food name is required
  description: { type: String, required: true },    // Description is required
  category: { type: String, required: true },       // Category is required
  imageUrl: { type: String, required: true },       // Image URL is required
  price: { type: Number, required: true },          // Price is required
  date: { type: Date, default: Date.now }           // Defaults to now if not provided
});

module.exports = mongoose.model("Food", foodSchema);
