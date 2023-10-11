const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const cookies = require('cookie-parser');
const verifyToken = require('./middlewares/verifyToken');

// const firebaseConfig = {
//   apiKey: "AIzaSyAgq70Lms32HDUnLK43IIBDu22KdzC8_EU",
//   authDomain: "nwen304-23.firebaseapp.com",
//   projectId: "nwen304-23",
//   storageBucket: "nwen304-23.appspot.com",
//   messagingSenderId: "638909197225",
//   appId: "1:638909197225:web:e2d400f868180049a8b2b8",
//   measurementId: "G-18J2WYQR10"
// };

const routes = require('./routes/routes');
const tokenBlacklist = require('./middlewares/tokenBlackList');
const app = express();

// firebase.initializeApp(firebaseConfig);

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


// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase

