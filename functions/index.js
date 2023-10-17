/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
//const functions = require('firebase-functions');
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const cookies = require('cookie-parser');
const verifyToken = require('./middlewares/verifyToken');

const routes = require('./routes/routes');
const tokenBlacklist = require('./middlewares/tokenBlackList');
const app = express();

app.use(cors());
app.use(cookies());

/**
 * Serve static files in public directory
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended:false }));

// To parse JSON data
app.use(express.json());

app.use('/', routes);

/**
 * Set template engine to ejs
 */
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/TradeCarsDB', { useNewUrlParser: true, useUnifiedTopology: true })
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

exports.app = onRequest(app);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
