const express = require('express');
const router = express.Router();
const Model = require('../models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Add a new user
router.post('/add', (req, res) => {
  new Model(req.body)
    .save()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get user by email
router.get('/getbyemail/:email', (req, res) => {
  Model.findOne({ email: req.params.email })
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get all users
router.get('/getall', (req, res) => {
  Model.find()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get user by ID
router.get('/getbyid/:id', (req, res) => {
  Model.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update user by ID
router.put('/update/:id', (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updated => {
      if (!updated) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(updated);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete user by ID
router.delete('/delete/:id', (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then(deleted => {
      if (!deleted) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User deleted successfully', deleted });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
