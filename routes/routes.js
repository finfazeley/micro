const express = require('express');
const router = express.Router();
const path = require('path');
const AuthController = require('../controllers/AuthController');
const ListingController = require('../controllers/ListingController');
const HomeController = require('../controllers/HomeController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', HomeController.getHomePage);

router.get('/auth', (req, res, next) => {
  res.render('auth');
})

router.get('/sell', verifyToken, (req, res, next) => {
  res.render('sell');
})

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/addcar', [verifyToken, ListingController.addcarlisting])

module.exports = router;

