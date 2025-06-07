const express = require('express');
const router = express.Router();
const Food = require('../models/foodModel'); // Make sure this model exists

// Get all food items
router.get('/getall', async (req, res) => {
  console.log('GET request for all food items');
  try {
    const foodItems = await Food.find();
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new food item
router.post('/add', async (req, res) => {
  const { name, description, category, imageUrl, price } = req.body;

  // Validate required fields
  if (!name || !description || !category || !imageUrl || !price) {
    return res.status(400).json({ 
      message: 'All fields are required: name, description, category, imageUrl, price.' 
    });
  }

  try {
    const newFood = new Food({
      name,
      description,
      category,
      imageUrl,
      price: Number(price)
    });

    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single food item
router.get('/:id', async (req, res) => {
  try {
    const foodItem = await Food.findById(req.params.id);
    if (!foodItem) return res.status(404).json({ message: 'Food item not found' });
    res.json(foodItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update food item
router.put('/:id', async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFood) return res.status(404).json({ message: 'Food item not found' });
    res.json(updatedFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete food item
router.delete('/:id', async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) return res.status(404).json({ message: 'Food item not found' });
    res.json({ message: 'Food item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
