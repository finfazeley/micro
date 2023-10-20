const User = require('../models/User');
const CarListing = require('../models/CarListing');
const findUser =  require('../utils/findUserById');
const findProd = require('../utils/findProductById')

const navPages = [
    { name: 'Home', url: '/', active: false },
    { name: 'Sell', url: '/sell', active: false},
    { name: 'Register', url: '/register', active: false},
    { name: 'Login', url: '/auth', active: false}
  ]

exports.showProd = (req, res, next) => {
    const userID = req.user;
    var login = true;
    if(!userID || userID === undefined) {
        login = false;
    }
    // Make sure knows if logged in AND knows which car listing
    findProd(req.params.prodID).then(async product => {
        findUser(userID).then(async user => {
            res.render('prod', {
                navPages: navPages,
                login: login,
                product: product,
                user:user
            });})
    });
}

exports.buyProd = (req, res, next) => {
    const userID = req.user;
    var login = true;
    if(!userID || userID === undefined) {
        login = false;
    }
    // Make sure knows if logged in AND knows which car listing
    findProd(req.params.prodID).then(async product => {
        findUser(userID).then(async user => {
            res.render('buy', {
                navPages: navPages,
                login: login,
                product: product,
                user:user
            });})
    });
}