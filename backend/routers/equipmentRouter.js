const express = require('express');
const router = express.Router();
const Equipment = require('../models/equipmentModel');

// Get all equipment items
router.get('/getall', async (req, res) => {
  try {
    const equipmentItems = await Equipment.find();
    res.json(equipmentItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new equipment item - POST to '/'
router.post('/', async (req, res) => {
  const { name, description, category, imageUrl, price } = req.body;

  if (!name || !description || !category || !imageUrl || price === undefined) {
    return res.status(400).json({
      message: 'All fields are required: name, description, category, imageUrl, price.',
    });
  }

  try {
    const newEquipment = new Equipment({
      name,
      description,
      category,
      imageUrl,
      price: Number(price),
    });

    await newEquipment.save();
    res.status(201).json(newEquipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ... other routes unchanged

module.exports = router;
