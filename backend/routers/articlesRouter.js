const express = require('express');
const router = express.Router();
const Article = require('../models/articleModel'); // Make sure this path and model exist

// GET all articles - GET /api/articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    console.error('Error fetching articles:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET single article by ID - GET /api/articles/:id
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(article);
  } catch (err) {
    console.error('Error fetching article:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST create new article - POST /api/articles
router.post('/', async (req, res) => {
  const { title, content, author, imageUrl, category } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Title, content, and author are required' });
  }
  try {
    const newArticle = new Article({ title, content, author, imageUrl, category });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    console.error('Error creating article:', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT update article - PUT /api/articles/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedArticle) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(updatedArticle);
  } catch (err) {
    console.error('Error updating article:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE article - DELETE /api/articles/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    console.error('Error deleting article:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
