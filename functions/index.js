// Firebase
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
// Dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const cookies = require('cookie-parser');
const passport = require('passport');
// Local
const routes = require('./routes/routes');
const googlePassport = require('./config/google_passport');

const app = express();

app.use(cors());
app.use(cookies());

// Session setup
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

/**
 * Serve static files in public directory
 */
app.use(express.urlencoded({ extended:false }));

// To parse JSON data
app.use(express.json());

app.use('/', routes);

/**
 * Set template engine to ejs
 */
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB + process.env.MONGO_CERT,
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

exports.app = onRequest(app);