// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Set up express and supporting libraries
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

// Controllers
const authController = require('./controllers/auth.js');

// ======  CONTROLLERS FOR PANTRY & COMMUNITY ======
const foodsController = require('./controllers/foods.js'); // for pantry CRUD
const usersController = require('./controllers/users.js'); // for community pages
// ==========================================================

// ======  MIDDLEWARES FOR USER AUTH & VIEWS =======
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
// ==========================================================

const port = process.env.PORT ? process.env.PORT : '3000';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//  body parser, method-override, session, etc.
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev')); // Uncomment for logging

// Session setup for user authentication
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// ====== MAKE USER AVAILABLE IN ALL VIEWS ======
app.use(passUserToView); // Adds user object to res.locals for EJS templates
// ==============================================

// ==== ROUTES ====

// Home route (no auth needed)
app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

// Example of a protected route (just for reference)
app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});

// Auth routes (sign in, sign up, sign out)
app.use('/auth', authController);

// ====== PROTECT ALL ROUTES BELOW THIS LINE ======
app.use(isSignedIn); // Only signed-in users can access these

// Pantry CRUD routes (foods)
app.use('/users/:userId/foods', foodsController);

// Community/user directory routes
app.use('/users', usersController);
// =================================================

// Start the server
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});