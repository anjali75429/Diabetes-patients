const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Equipment",equipmentSchema);
