const BlogPost = require('../models/blogPost');

module.exports = (req, res) => {
  BlogPost.find()
    .populate('userid')
    .sort({ datePosted: -1 })
    .limit(4)
    .then((blogPosts) => {
      res.render('index', { blogPosts });
    })
    .catch((error) => {
      console.error(error);
      res.render('index', { blogPosts: [] });
    });
};
