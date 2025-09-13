// middleware/pass-user-to-view.js
// Makes the user object available in all EJS views

module.exports = function(req, res, next) {
  res.locals.user = req.session.user;
  next();
};
