const User = require('../models/User');
const CarListing = require('../models/CarListing');
const findUser =  require('../utils/findUserById');
const findProd = require('../utils/findProductById')
const navPages = require('../utils/navPages');

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
                activeUrl: '/prod',
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
                activeUrl: '/buy',
                login: login,
                product: product,
                user:user,
                userID: userID
            });})
    });
}

exports.completePurchase = async (req, res) => {
    try {

        const product = await findProd(req.body.prod);

        if(!product) {
            console.log("No product found");
            res.status(400).json({message: 'No product found'});
            return res.redirect('/');

        }

        // check user credentials match
        if (req.body.username !== await findUser(req.body.userID)){
            res.status(400).json({message: 'Incorrect username'});
            return res.redirect('/');
        }

        // user cant buy their own car
        if (req.body.username === product.user.name){
            res.status(400).json({message: 'Cannot buy your own car'});
            return res.redirect('/');
        }

        // "purchase" the car from mongodb
        const result = await CarListing.deleteOne({_id: req.body.prod});
        if (result.deletedCount === 1) {
            
            //console.log("Successfully deleted one document.");

            // give user product in purchase history
            const res2 = await User.updateOne(
                { _id: req.body.userID },
                { $push: { purchases: product.price } },
            );
            
            //console.log(res2);

          } else {
            res.status(400).json({message: "Product couldn't be purchased"});
        }

        // finished
        return res.redirect('/');

        
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  }