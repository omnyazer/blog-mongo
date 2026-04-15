module.exports = (req, res) => {
  res.render('register', {
    errors: req.session.validationErrors
  });

  req.session.validationErrors = null;
};
