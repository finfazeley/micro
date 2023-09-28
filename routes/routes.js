const express = require('express');
const router = express.Router();
const path = require('path');
const AuthController = require('../controllers/AuthController');


router.get('/', (req, res, next) => {
  res.render('index');
})

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;

