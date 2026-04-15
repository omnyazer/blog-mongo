const BlogPost = require('./src/models/blogPost');
const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/post/new', (req, res) => {
  res.render('create');
});

app.get('/post/:id', (req, res) => {
  BlogPost.findById(req.params.id)
    .then((blogPost) => {
      res.render('post', { blogPost });
    })
    .catch((error) => {
      console.error(error);
      res.render('post', { blogPost: null });
    });
});

app.get('/list', (req, res) => {
  BlogPost.find()
    .then((blogPosts) => {
      res.render('list', { blogPosts });
    })
    .catch((error) => {
      console.error(error);
      res.render('list', { blogPosts: [] });
    });
});

app.post('/posts/store', (req, res) => {
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
      path.resolve(__dirname, 'public/images', image),
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
});

// connexion MongoDB
mongoose
  .connect('mongodb://localhost/my_blog')
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch((error) => {
    console.error('Erreur MongoDB:', error.message);
  });

// serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
