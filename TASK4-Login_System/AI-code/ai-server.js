const express = require('express');
const session = require('express-session');
const connectDB = require('./db');
const User = require('./User');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,       // Prevent JS from reading cookie
      maxAge: 1000 * 60 * 60 // Session expires in 1 hour
    }
  })
);

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized. Please login first.' });
};

// POST /register
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = new User(username, password);
    const message = await user.register();

    return res.status(201).json({ message });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// POST /login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = new User(username, password);
    await user.login(); // throws if invalid

    // Save username in session
    req.session.user = username;

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

// GET /dashboard (protected)
app.get('/dashboard', isAuthenticated, (req, res) => {
  return res.status(200).json({ message: `Welcome ${req.session.user}` });
});

// GET /logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    return res.status(200).json({ message: 'Logout successful' });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
