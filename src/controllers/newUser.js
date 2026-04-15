module.exports = (req, res) => {
  const data = req.flash('data')[0];

  let username = '';
  let password = '';

  if (typeof data !== 'undefined') {
    username = data.username;
    password = data.password;
  }

  res.render('register', {
    errors: req.flash('validationErrors'),
    username,
    password
  });
};
