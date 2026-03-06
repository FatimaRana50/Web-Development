// ai-server.js
const express = require('express');
const session = require('express-session');
const connectDB = require('./ai-db');
const User = require('./ai-User');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: 'your-secret-key-here',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  })
);

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ message: 'Please login first' });
};

// Home route (optional - for browser testing)
app.get('/', (req, res) => {
  res.json({
    message: 'AI Login System API',
    endpoints: {
      register: 'POST /register',
      login: 'POST /login',
      dashboard: 'GET /dashboard (protected)',
      logout: 'GET /logout'
    }
  });
});

// POST /register
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Create user instance and register
    const user = new User(username, password);
    const message = await user.register();

    res.status(201).json({ message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Create user instance and login
    const user = new User(username, password);
    const result = await user.login();

    // Store user in session
    req.session.user = username;

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// GET /dashboard (protected)
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.session.user}` });
});

// GET /logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Start server (using port 3001 to avoid conflict with student server)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ AI Server running on http://localhost:${PORT}`);
  console.log(`📝 Register: POST http://localhost:${PORT}/register`);
  console.log(`🔑 Login: POST http://localhost:${PORT}/login`);
  console.log(`📊 Dashboard: GET http://localhost:${PORT}/dashboard`);
  console.log(`🚪 Logout: GET http://localhost:${PORT}/logout`);
});