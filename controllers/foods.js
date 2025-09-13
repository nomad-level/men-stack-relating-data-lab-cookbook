// Import express to create routes, and import the User model.
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// INDEX - List all foods in the user's pantry
router.get('/', async (req, res) => {
  try {
    // Find the user by ID (from params or session)
    const user = await User.findById(req.params.userId);
    // Render the foods/index view, passing the user's pantry
    res.render('foods/index.ejs', { pantry: user.pantry, user });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// NEW - Form to add a new food item
router.get('/new', (req, res) => {
  // Render the new food form
  res.render('foods/new.ejs', { user: req.params.userId });
});

// CREATE - Add a new food to the pantry
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    // Add new food item from form (req.body) to the pantry array
    user.pantry.push({ name: req.body.name });
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// EDIT - Form to edit a food item
router.get('/:itemId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.itemId); // Find food by ID
    res.render('foods/edit.ejs', { food, user });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// UPDATE - Update a food item
router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.itemId);
    food.set({ name: req.body.name }); // Update the food's name
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// DELETE - Remove a food item from the pantry
router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.pantry.id(req.params.itemId).deleteOne();
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;