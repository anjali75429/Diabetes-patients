// middleware/authMiddleware.js
const requireAuth = (req, res, next) => {
    const userId = req.header('x-user-id'); // Simulate user authentication with header
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: Missing user ID' });
    }
    req.userId = userId; // Attach user ID to the request object
    next();
  };
  
  module.exports = requireAuth;
  