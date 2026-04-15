const validateMiddleware = (req, res, next) => {
  if (!req.files || !req.body.title || !req.body.body) {
    return res.redirect('/post/new');
  }

  next();
};

module.exports = validateMiddleware;
