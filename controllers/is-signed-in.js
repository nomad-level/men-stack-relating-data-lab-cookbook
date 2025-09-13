// Middleware to check if a user is signed in
const isSignedIn = (req, res, next) => {
  if (req.session.user) return next(); // If session has user, proceed
  res.redirect('/auth/sign-in'); // Otherwise, redirect to sign-in
};
module.exports = isSignedIn;