const BlogPost = require('../models/blogPost');

module.exports = (req, res) => {
  const search = req.query.search ? req.query.search.trim() : '';

  BlogPost.find({ userid: { $exists: true, $ne: null } })
    .populate('userid')
    .sort({ datePosted: -1 })
    .then((blogPosts) => {
      res.render('list', { blogPosts, search });
    })
    .catch((error) => {
      console.error(error);
      res.render('list', { blogPosts: [], search });
    });
};
