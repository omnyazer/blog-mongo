const User = require('../models/User');

module.exports = (req, res) => {
  const { username, password } = req.body;

  const user = new User({
    username,
    password
  });

  user.save()
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      const validationErrors = Object.keys(error.errors).map(
        key => error.errors[key].message
      );

      req.session.validationErrors = validationErrors;

      return res.redirect('/auth/register');
    });
};
