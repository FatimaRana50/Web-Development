const express = require('express');
const session = require('express-session');
require('./db');
const User = require('./User');

const app = express();

// Middleware to read form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

// Auth middleware to protect dashboard
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.send('Please login first');
  }
}

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User(username, password);
  const message = await user.register();
  res.send(message);
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = new User(username, password);
  const result = await user.login();
  if (result) {
    req.session.user = username;
    res.send('Login successful');
  } else {
    res.send('Wrong username or password');
  }
});

// Dashboard route (protected)
app.get('/dashboard', isLoggedIn, (req, res) => {
  res.send('Welcome ' + req.session.user);
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logout successful');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
