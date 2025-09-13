// controllers/users.js
// Basic user controller template

const express = require('express');
const router = express.Router();

// Example: GET /users
router.get('/', (req, res) => {
  res.send('User index page');
});

module.exports = router;
