// middleware/validateOrder.js
module.exports = function validateOrder(req, res, next) {
    const { items, totalPrice } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item.' });
    }
    if (typeof totalPrice !== 'number' || totalPrice <= 0) {
      return res.status(400).json({ message: 'Invalid total price.' });
    }
    next(); // Proceed to the next middleware or route handler
  };
  