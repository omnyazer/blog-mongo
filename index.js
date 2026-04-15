const homeController = require('./src/controllers/home');
const listPostController = require('./src/controllers/listPost');
const getPostController = require('./src/controllers/getPost');
const newPostController = require('./src/controllers/newPost');
const storePostController = require('./src/controllers/storePost');
const validateMiddleware = require('./src/middleware/validateMiddleware');
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
app.get('/', homeController);

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/post/new', newPostController);

app.get('/post/:id', getPostController);

app.get('/list', listPostController);

app.post('/posts/store', validateMiddleware, storePostController);

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
