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
    findProd(req.params.prodID).then(async product => {
    //product = 
    res.render('prod', {
        navPages: navPages,
        login: login,
        product: product
    });
    });
    }
