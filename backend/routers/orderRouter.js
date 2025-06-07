const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// Get all orders (admin)
router.get('/getall', async (req, res) => {
  console.log('GET request for all orders');
  try {
    const orders = await Order.find().populate('userId').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new order
router.post('/add', async (req, res) => {
  const { userId, items, totalPrice, status, shippingInfo } = req.body;
  try {
    // Validate required fields
    if (!userId || !items || !items.length || !totalPrice || !shippingInfo) {
      return res.status(400).json({ 
        message: 'Missing required fields. Please provide userId, items, totalPrice, and shippingInfo' 
      });
    }

    // Validate items structure
    for (const item of items) {
      if (!item.itemId || !item.itemType || !item.quantity) {
        return res.status(400).json({ 
          message: 'Invalid item structure. Each item must have itemId, itemType, and quantity' 
        });
      }
    }

    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      status: status || 'pending',
      shippingInfo
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(400).json({ message: err.message });
  }
});

// Get single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId').populate('items.itemId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order (e.g., status update)
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('userId').populate('items.itemId');
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete order
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
