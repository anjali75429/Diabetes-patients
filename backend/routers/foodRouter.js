const express = require('express');
const router = express.Router();
const Food = require('../models/foodModel');

// GET all food items - GET /api/food/getall
router.get('/getall', async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.status(200).json(foodItems);
  } catch (err) {
    console.error('Error fetching food items:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET single food item - GET /api/food/:id
router.get('/:id', async (req, res) => {
  try {
    const foodItem = await Food.findById(req.params.id);
    if (!foodItem) return res.status(404).json({ message: 'Food item not found' });
    res.status(200).json(foodItem);
  } catch (err) {
    console.error('Error fetching food item:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST create new food item - POST /api/food
router.post('/', async (req, res) => {
  const { name, description, category, imageUrl, price } = req.body;
  if (!name || !description || !category || !imageUrl || price === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const newFood = new Food({ name, description, category, imageUrl, price });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    console.error('Error adding food:', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT update food item - PUT /api/food/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedFood) return res.status(404).json({ message: 'Food item not found' });
    res.status(200).json(updatedFood);
  } catch (err) {
    console.error('Error updating food item:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE food item - DELETE /api/food/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) return res.status(404).json({ message: 'Food item not found' });
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (err) {
    console.error('Error deleting food item:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
