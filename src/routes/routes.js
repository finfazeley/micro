const express = require('express');
const router = express.Router();
const path = require('path');
const AuthController = require('../controllers/AuthController');
const ListingController = require('../controllers/ListingController');
const HomeController = require('../controllers/HomeController');
const checkLogin = require('../middlewares/checkLogin');
const passport = require('passport');
const MLController = require('../controllers/MyListController');
const pController = require('../controllers/ProdController');
const accountController = require('../controllers/AccountController');
const recController = require('../controllers/Recommended')

// recommendation
router.get('/recommended', checkLogin, recController.getRecommended);

// email password reset
router.get('/resetPassword', checkLogin, accountController.getReset)
router.post('/resetPassword', checkLogin, accountController.postReset)
router.get('/changePassword/:userId/:token', checkLogin, accountController.changePassword)
router.post('/changePassword/confirm', checkLogin, accountController.confirmPassword)

// Home //
router.get('/', checkLogin, HomeController.getHomePage);

// Sell //
router.get('/sell', checkLogin, ListingController.getSellPage);
router.post('/addcar', [checkLogin, ListingController.addcarlisting]);

// My listings
router.get('/myListings', checkLogin, MLController.getML);

// When you click on a listing
router.get('/product/:prodID', checkLogin, pController.showProd);

// to buy a listing
router.get('/buy/:prodID', checkLogin, pController.buyProd);
router.post('/confirmPurchase', [checkLogin, pController.completePurchase]);

// to show users account
router.get('/account', checkLogin, accountController.getAccount);

// Auth //
router.get('/auth', checkLogin, AuthController.getAuthPage);
router.post('/register', AuthController.register);
router.get('/register', AuthController.getRegisterPage);
router.post('/login', AuthController.login);
router.get('/logout', checkLogin, AuthController.logout);

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/?auth-failed=true' }),
    (req, res) => {
        console.log("Google Auth Callback hit");
        res.redirect('/');  
    }
);

module.exports = router;
