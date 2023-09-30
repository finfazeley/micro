const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const routes = require('./routes/routes');
const tokenBlacklist = require('./middlewares/tokenBlackList');
const verifyToken = require('./middlewares/verifyToken');
const googlePassport = require('./config/google_passport');
const passport = require('passport');

const app = express();

app.use(cors());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));


/**
 * Serve static files in public directory
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended:false }));

// To parse JSON data
app.use(express.json());

app.use('/', routes);

app.use(passport.initialize());
app.use(passport.session());

/**
 * Set template engine to ejs
 */
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/TradeCarsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/protected', verifyToken, (req, res) => {
  res.send('This is a protected route!');
});

// Logout route
app.post('/logout', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');

  tokenBlacklist.push(token);
  res.send('Logged out successfully');
});

//app.use((req, res) => { res.send("Page Not Found")});

app.listen(5001, () => {
  console.log("Heard on 5001");
}).on('error', (err) => {
  // check if the error thrown is an address in use error
  if (err.errno === 'EADDRINUSE') {
    console.log("Port 5001 is already in use");
  } else {
    console.log(err);
  }
});