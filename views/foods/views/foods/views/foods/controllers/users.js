// Import express to create routes
const express = require('express');
const router = express.Router();

// Import the User model so we can query users from the database
const User = require('../models/user.js');

// INDEX - Community page: Show all users
router.get('/', async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();
    // Render a view called users/index.ejs, passing in the list of users
    res.render('users/index.ejs', { users });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// SHOW - Show a single user's pantry (read-only)
router.get('/:userId', async (req, res) => {
  try {
    // Find the user by their id (from the URL)
    const user = await User.findById(req.params.userId);
    // Render a view called users/show.ejs, passing in the user
    res.render('users/show.ejs', { user });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// Export the router so it can be used in server.js
module.exports = router;