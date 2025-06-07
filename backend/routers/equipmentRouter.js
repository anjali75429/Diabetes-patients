const express = require('express');
const router = express.Router();
const Equipment = require('../models/equipmentModel'); // Make sure path is correct

// Get all equipment items
router.get('/getall', async (req, res) => {
  console.log('GET request for all equipment items');
  try {
    const equipmentItems = await Equipment.find();
    res.json(equipmentItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new equipment item
router.post('/add', async (req, res) => {
  const { name, description, category, imageUrl, price } = req.body;

  // Validate required fields
  if (!name || !description || !category || !imageUrl || price === undefined) {
    return res.status(400).json({ 
      message: 'All fields are required: name, description, category, imageUrl, price.' 
    });
  }

  try {
    const newEquipment = new Equipment({
      name,
      description,
      category,
      imageUrl,
      price: Number(price)
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
    const equipmentItem = await Equipment.findById(req.params.id);
    if (!equipmentItem) return res.status(404).json({ message: 'Equipment item not found' });
    res.json(equipmentItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update equipment item
router.put('/:id', async (req, res) => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEquipment) return res.status(404).json({ message: 'Equipment item not found' });
    res.json(updatedEquipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete equipment item
router.delete('/:id', async (req, res) => {
  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!deletedEquipment) return res.status(404).json({ message: 'Equipment item not found' });
    res.json({ message: 'Equipment item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
