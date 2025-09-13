// Simple controller for the community page and user profiles
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Community page - show all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('users/index.ejs', { users });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// Show a single user's pantry (read-only)
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.render('users/show.ejs', { user });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;
