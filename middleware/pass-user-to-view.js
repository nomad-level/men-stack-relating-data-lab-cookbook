// middleware/pass-user-to-view.js
// Makes the user object available in all EJS views

// Middleware to make user info available in all views
const passUserToView = (req, res, next) => {
  res.locals.user = req.session.user ? req.session.user : null;
  next();
};
module.exports = passUserToView;
