const express = require('express');
const router = express.Router();
const path = require('path');
const AuthController = require('../controllers/AuthController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', (req, res, next) => {
  res.render('index');
})

router.get('/auth', (req, res, next) => {
  res.render('auth');
})

router.get('/sell', verifyToken, (req, res, next) => {
  res.render('sell');
})

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;

