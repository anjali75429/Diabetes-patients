const express = require('express');
const router = express.Router();
const Equipment = require('../models/equipmentModel'); // Make sure this model exists

// Get all equipment
router.get('/getall', async (req, res) => {
  console.log('GET request for all equipment');
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new equipment
router.post('/', async (req, res) => {
  const { name, title, content, category, image, price } = req.body;

  if (!name || !title || !content || !category || !image || price === undefined) {
    return res.status(400).json({ message: 'All fields are required: name, title, content, category, image, price.' });
  }

  try {
    const newEquipment = new Equipment({
      name,
      title,
      content,
      category,
      image,
      price
    });

    await newEquipment.save();
    res.status(201).json(newEquipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single equipment item
router.get('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update equipment
router.put('/:id', async (req, res) => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEquipment) return res.status(404).json({ message: 'Equipment not found' });
    res.json(updatedEquipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete equipment
router.delete('/:id', async (req, res) => {
  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!deletedEquipment) return res.status(404).json({ message: 'Equipment not found' });
    res.json({ message: 'Equipment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
