const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          // mot de passe correct
          req.session.userId = user._id;
          console.dir(req.session);
          res.redirect('/');
        } else {
          // mauvais mot de passe
          req.flash('error', 'Username or password is incorrect');
          res.redirect('/auth/login');
        }
      });
    } else {
      // utilisateur introuvable
      req.flash('error', 'Username or password is incorrect');
      res.redirect('/auth/login');
    }
  });
};
