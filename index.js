const path = require('path');
const express = require('express');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createUserController = require("./controllers/createUser");
const createPostController = require('./controllers/createPost');
const getPostController = require('./controllers/getPost');
const loginController = require("./controllers/login");
const loginUserController = require('./controllers/loginUser');
const storeUserController = require('./controllers/storeUser');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/node-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

module.exports = connectToDatabase;

const app = new express();

///app.use(express.static('public'));      //no use of static pages
app.use(expressEdge);
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
});



///app.use(express.static('public1'));
app.use(expressEdge);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/posts/store', (req, res) => {
    Post.create(req.body, (error, post) => {
        res.redirect('/')
    })
});                             ///interacting with database

const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

app.get("/blog", createPostController);
app.get("/post/:id", getPostController);
app.get('/login', redirectIfAuthenticated, loginController);
app.post('/users/login',redirectIfAuthenticated,  loginUserController);
app.get("/register",redirectIfAuthenticated,  createUserController);
app.post("/users/register",redirectIfAuthenticated,  storeUserController);

app.listen(4000, () => {
    console.log('App listening on port 4000')
});

