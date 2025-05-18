const express = require('express');
const router  = express.Router();
const Cart    = require('../models/cartModel');

// GET  /cart         → get all carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /cart         → create new cart
router.post('/', async (req, res) => {
  const { user, items, total } = req.body;
  try {
    const newCart = new Cart({ user, items, total });
    await newCart.save();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET  /cart/:id     → get one cart
router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT  /cart/:id     → update
router.put('/:id', async (req, res) => {
  try {
    const updated = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Cart not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /cart/:id   → delete
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Cart not found' });
    res.json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
