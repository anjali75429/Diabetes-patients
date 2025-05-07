const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true }, 
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Equipment", equipmentSchema);
