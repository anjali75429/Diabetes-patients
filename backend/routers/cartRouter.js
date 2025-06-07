const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const auth = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');

// Utility to calculate cart total price
const calculateCartTotal = (items) =>
  parseFloat(items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));

// GET /api/cart - Get authenticated user's cart
router.get(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.json({ items: [], total: 0 });
    }

    res.json({
      items: cart.items || [],
      total: cart.total || calculateCartTotal(cart.items || []),
    });
  })
);

// POST /api/cart - Add items to cart or create cart
router.post(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: 'Items should be an array' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId: req.user._id,
        items,
        total: calculateCartTotal(items),
      });
    } else {
      // Add or update existing items in cart
      items.forEach((item) => {
        const existingItemIndex = cart.items.findIndex(
          (ci) => ci.productId.toString() === item.productId.toString()
        );
        if (existingItemIndex !== -1) {
          // Update quantity for existing item
          cart.items[existingItemIndex].quantity += item.quantity;
        } else {
          // Add new item
          cart.items.push(item);
        }
      });
      cart.total = calculateCartTotal(cart.items);
    }

    await cart.save();

    res.status(201).json({ message: 'Cart updated', cart });
  })
);

// PUT /api/cart/:productId - Update quantity for a product
router.put(
  '/:productId',
  auth,
  asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity == null || quantity < 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity === 0) {
      // Remove item if quantity is 0
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    cart.total = calculateCartTotal(cart.items);
    await cart.save();

    res.json({ message: 'Cart updated', cart });
  })
);

// DELETE /api/cart/:productId - Remove item from cart
router.delete(
  '/:productId',
  auth,
  asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);
    cart.total = calculateCartTotal(cart.items);

    await cart.save();

    res.json({ message: 'Item removed', cart });
  })
);

// DELETE /api/cart - Clear cart completely
router.delete(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      cart.items = [];
      cart.total = 0;
      await cart.save();
    }

    res.json({ message: 'Cart cleared' });
  })
);

module.exports = router;
