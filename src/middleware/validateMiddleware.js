const validateMiddleware = (req, res, next) => {
  if (!req.body.title || !req.body.body) {
    return res.redirect('/post/new');
  }

  next();
};

module.exports = validateMiddleware;
