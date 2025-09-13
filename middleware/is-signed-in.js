// middleware/is-signed-in.js
// Basic middleware to check if user is signed in

module.exports = function(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.redirect('/auth/sign-in');
  }
};
