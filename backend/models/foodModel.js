const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({

  title: { type: String },
  content: { type: String },
  category: { type: String },
  image: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Food", foodSchema);
