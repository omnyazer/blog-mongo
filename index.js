require('dotenv').config();

const homeController = require('./src/controllers/home');
const listPostController = require('./src/controllers/listPost');
const getPostController = require('./src/controllers/getPost');
const loginController = require('./src/controllers/login');
const loginUserController = require('./src/controllers/loginUser');
const logoutController = require('./src/controllers/logout');
const newPostController = require('./src/controllers/newPost');
const newUserController = require('./src/controllers/newUser');
const storePostController = require('./src/controllers/storePost');
const deletePostController = require('./src/controllers/deletePost');
const storeUserController = require('./src/controllers/storeUser');
const authMiddleware = require('./src/middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./src/middleware/redirectIfAuthenticatedMiddleware');
const validateMiddleware = require('./src/middleware/validateMiddleware');
const express = require('express');
const expressSession = require('express-session');
const flash = require('connect-flash');
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
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
app.use(expressSession({
  secret: 'mySecretKey',
}));
app.use(flash());

global.loggedIn = null;

app.use((req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.get('/', homeController);

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/auth/logout', logoutController);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.get('/post/new', authMiddleware, newPostController);

app.get('/post/example-ia', (req, res) => {
  const blogPost = {
    title: 'Comment l’IA transforme la robotique moderne',
    body: "L’intelligence artificielle permet aux robots de mieux comprendre leur environnement, d’apprendre des comportements plus précis et d’automatiser des tâches complexes. Cet article exemple présente les bases de la vision IA, de l’apprentissage progressif et des usages concrets dans l’industrie, la santé et l’éducation.",
    datePosted: new Date(),
    userid: null,
    image: null
  };

  res.render('post', {
    blogPost,
    customHeaderImage: '/assets/img/RobotIA.png'
  });
});

app.get('/post/:id', getPostController);

app.get('/list', listPostController);

app.post('/posts/store', validateMiddleware, storePostController);
app.post('/posts/delete/:id', authMiddleware, deletePostController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.use((req, res) => {
  res.status(404).render('notfound');
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch((error) => {
    console.error('Erreur MongoDB:', error.message);
  });

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
