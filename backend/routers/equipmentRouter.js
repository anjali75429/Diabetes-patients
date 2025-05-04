const express = require('express');
const router = express.Router();
const Model = require('../models/equipmentModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Add a new article
router.post('/add', (req, res) => {
  new Model(req.body)
    .save()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});



// Get all articles
router.get('/getall', (req, res) => {
  Model.find()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get article by ID
router.get('/getbyid/:id', (req, res) => {
  Model.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'article not found' });
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update article by ID
router.put('/update/:id', (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updated => {
      if (!updated) return res.status(404).json({ message: 'article not found' });
      res.status(200).json(updated);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete article by ID
router.delete('/delete/:id', (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then(deleted => {
      if (!deleted) return res.status(404).json({ message: 'article not found' });
      res.status(200).json({ message: 'article deleted successfully', deleted });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
