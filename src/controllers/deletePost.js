const BlogPost = require('../models/blogPost');

module.exports = (req, res) => {
  const redirectTo = req.get('referer') || '/list';

  BlogPost.findById(req.params.id)
    .then((blogPost) => {
      if (!blogPost) {
        return res.redirect(redirectTo);
      }

      if (String(blogPost.userid) !== String(req.session.userId)) {
        return res.redirect(redirectTo);
      }

      return BlogPost.findByIdAndDelete(req.params.id).then(() => {
        res.redirect(redirectTo);
      });
    })
    .catch((error) => {
      console.error('Error deleting blog post:', error);
      res.redirect(redirectTo);
    });
};
