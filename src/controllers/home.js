const BlogPost = require('../models/blogPost');

module.exports = (req, res) => {
  BlogPost.find({ userid: { $exists: true, $ne: null } })
    .populate('userid')
    .sort({ datePosted: -1 })
    .then((blogPosts) => {
      res.render('index', { blogPosts });
    })
    .catch((error) => {
      console.error(error);
      res.render('index', { blogPosts: [] });
    });
};
