const BlogPost = require('../models/blogPost');
const path = require('path');

module.exports = (req, res) => {
  const { title, body } = req.body;
  const image = req.files && req.files.image ? req.files.image.name : null;
  const userid = req.session.userId;

  const createPost = () => {
    BlogPost.create({ title, body, image, userid })
      .then((blogPost) => {
        console.log('Blog post created:', blogPost);
        res.redirect('/list');
      })
      .catch((error) => {
        const validationErrors = Object.keys(error.errors).map(
          key => error.errors[key].message
        );

        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);

        return res.redirect('/post/new');
      });
  };

  if (image) {
    const imageFile = req.files.image;

    imageFile.mv(
      path.resolve(__dirname, '../../public/images', image),
      (error) => {
        if (error) {
          console.error('Error uploading image:', error);
          return res.render('create');
        }

        createPost();
      }
    );
  } else {
    createPost();
  }
};
