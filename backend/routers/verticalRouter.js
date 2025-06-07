const express = require('express');
const router = express.Router();

// Example vertical routes
router.get('/', (req, res) => {
  res.send('Vertical route root');
});

router.get('/dashboard', (req, res) => {
  res.send('Vertical dashboard view');
});

module.exports = router;
