const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    secret: "mysupersecretkey",
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());

const sessionRoutes = require('./routes/sessionRoutes');
app.use('/session', sessionRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});