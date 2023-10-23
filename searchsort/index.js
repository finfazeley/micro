// Dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
// Local
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const period = 60 * 5 
  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${period}`)
  } else {
    res.set('Cache-control', `no-store`)
  }
  next()
});
app.use('/api', routes);

const PORT = 5001;

// Connect to MongoDB
mongoose.connect(new String(process.env.MONGO_DB + process.env.MONGO_CERT).toString(),
  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
});
