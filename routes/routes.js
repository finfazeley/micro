const express = require('express');
const router = express.Router();
const path = require('path');
const AuthController = require('../controllers/AuthController');
const passport = require('passport');


router.get('/', (req, res, next) => {
  res.render('index');
})

router.get('/register', (req, res, next) => {
  res.render('register');
})

router.get('/login', (req, res, next) => {
  res.render('login');
})

router.get('/logout', (req, res, next) => {
  res.render('logout');
})

// router.get('/protected', (req, res, next) => {
//   res.render('protected');
// })

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/protected');
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;

