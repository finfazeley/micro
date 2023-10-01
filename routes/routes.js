const express = require('express');
const router = express.Router();
const path = require('path');
const AuthController = require('../controllers/AuthController');
const ListingController = require('../controllers/ListingController');
const HomeController = require('../controllers/HomeController');
const verifyToken = require('../middlewares/verifyToken');
const checkLogin = require('../middlewares/checkLogin');

// Home //
router.get('/', checkLogin, HomeController.getHomePage);

// Sell //
router.get('/sell', verifyToken, ListingController.getSellPage);
router.post('/addcar', [verifyToken, ListingController.addcarlisting])

// Auth //
router.get('/auth', AuthController.getAuthPage);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
