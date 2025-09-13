// Import mongoose for creating schemas and models
const mongoose = require('mongoose');

// 1. Define the schema for a single food item in the pantry
// This schema just needs a name for now, but you can expand it later
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true }
  // You can add more fields later, like quantity, notes, etc.
});

// 2. Define the user schema as before, but now add the embedded pantry array
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // This is the key line for the lab!
  pantry: [foodSchema] // An array of food items, using the foodSchema above
});

// 3. Create the User model from the schema
const User = mongoose.model('User', userSchema);

// 4. Export the User model so it can be used in other files
module.exports = User;