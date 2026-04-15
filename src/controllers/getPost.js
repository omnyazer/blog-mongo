const BlogPost = require('../models/blogPost');

module.exports = (req, res) => {
  BlogPost.findById(req.params.id)
    .then((blogPost) => {
      res.render('post', { blogPost });
    })
    .catch((error) => {
      console.error(error);
      res.render('post', { blogPost: null });
    });
};
