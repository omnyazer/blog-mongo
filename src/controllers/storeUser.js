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
      console.log(error);
      res.redirect('/auth/register');
    });
};
