const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  content: { type: String, required: true },
  author: { type: String, required: true, trim: true },       // Added author
  category: { type: String, trim: true },
  date: { type: Date, default: Date.now },
  imageUrl: { type: String, trim: true },                      // renamed from image to imageUrl
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
