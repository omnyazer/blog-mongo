module.exports = (req, res) => {
  const data = req.flash('data')[0];

  let title = '';
  let body = '';

  if (typeof data !== 'undefined') {
    title = data.title;
    body = data.body;
  }

  if (req.session.userId) {
    return res.render('create', {
      errors: req.flash('validationErrors'),
      title,
      body
    });
  }

  res.redirect('/auth/login');
};
