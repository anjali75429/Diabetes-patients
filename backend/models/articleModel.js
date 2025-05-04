const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters"]
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    minlength: [10, "Content must be at least 10 characters"]
  },
  category: {
    type: String,
    required: [true, "Category is required"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Article", articleSchema);
