const BlogPost = require('../models/blogPost');

module.exports = (req, res) => {
  BlogPost.find()
    .populate('userid')
    .then((blogPosts) => {
      res.render('list', { blogPosts });
    })
    .catch((error) => {
      console.error(error);
      res.render('list', { blogPosts: [] });
    });
};
