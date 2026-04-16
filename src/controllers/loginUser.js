const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      req.flash('error', 'Username or password is incorrect');
      return res.redirect('/auth/login');
    }

    const same = await bcrypt.compare(password, user.password);

    if (!same) {
      req.flash('error', 'Username or password is incorrect');
      return res.redirect('/auth/login');
    }

    req.session.userId = user._id;
    console.dir(req.session);
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Username or password is incorrect');
    return res.redirect('/auth/login');
  }
};
