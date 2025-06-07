const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

// POST /contact - Submit a new contact message
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  // Create new contact document
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();  // Save to the database

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
