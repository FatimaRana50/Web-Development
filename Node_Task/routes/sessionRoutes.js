const express = require('express');
const router = express.Router();

// Set session
router.get('/', (req, res) => {
    req.session.name = "Fatima";
    req.session.loggedIn = true;
    res.send("Session data set.");
});

// Get session
router.get('/sessions', (req, res) => {
    res.send(req.session);
});

module.exports = router;