const BlogPost = require('../models/blogPost');
const path = require('path');

module.exports = (req, res) => {
  const { title, body } = req.body;
  const image = req.files && req.files.image ? req.files.image.name : null;

  const createPost = () => {
    BlogPost.create({ title, body, image })
      .then((blogPost) => {
        console.log('Blog post created:', blogPost);
        res.redirect('/');
      })
      .catch((error) => {
        console.error('Error creating blog post:', error);
        res.render('create');
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
