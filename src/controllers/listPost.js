const BlogPost = require('../models/blogPost');

module.exports = (req, res) => {
  const search = req.query.search ? req.query.search.trim() : '';
  const query = search
    ? {
      userid: { $exists: true, $ne: null },
      title: { $regex: search, $options: 'i' }
    }
    : { userid: { $exists: true, $ne: null } };

  BlogPost.find(query)
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
