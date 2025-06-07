const validator = require('validator');
const mongoose = require('mongoose');

// Validate cart item
const validateCartItem = (req, res, next) => {
  const { productId, name, price, quantity = 1 } = req.body;

  try {
    // Check required fields
    if (!productId || !name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide product details'
      });
    }

    // Validate product ID format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    // Validate name
    if (validator.isEmpty(name.trim()) || name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Product name must be between 1 and 100 characters'
      });
    }

    // Validate price
    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice < 0 || numericPrice > 999999.99) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a positive number less than 1,000,000'
      });
    }

    // Validate quantity
    const numericQuantity = Number(quantity);
    if (!Number.isInteger(numericQuantity) || numericQuantity < 1 || numericQuantity > 100) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be between 1 and 100'
      });
    }

    // Sanitize and transform data
    req.body.name = validator.escape(name.trim());
    req.body.price = Number(numericPrice.toFixed(2));
    req.body.quantity = numericQuantity;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Validation error',
      error: error.message
    });
  }
};

// Validate ID parameter
const validateMongoId = (req, res, next) => {
  const id = req.params.id || req.params.productId;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }
  next();
};

// Validate pagination parameters
const validatePagination = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (page < 1 || limit < 1 || limit > 100) {
    return res.status(400).json({
      success: false,
      message: 'Invalid pagination parameters'
    });
  }

  req.pagination = { page, limit };
  next();
};

module.exports = { 
  validateCartItem,
  validateMongoId,
  validatePagination
};