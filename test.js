const mongoose = require('mongoose');
const BlogPost = require('./src/models/blogPost');

const id = 'A_REMPLACER_PAR_MON_OBJECTID';

mongoose
  .connect('mongodb://localhost/my_blog')
  .then(() => BlogPost.findById(id))
  .then((blogPost) => {
    console.log('Blog post found:', blogPost);
  })
  .catch((error) => {
    console.error('Error finding blog post:', error);
  })
  .finally(() => mongoose.connection.close());
