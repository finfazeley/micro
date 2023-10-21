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
                user:user
            });})
    });
}

exports.completePurchase = async (req, res) => {
    try {

        const product = findProd(req.body.prod);

        if(!product) {
            console.log("No product found");
            res.status(400).json({message: 'No product found'});
            return;
        }
        // check user credentials match
        if (req.body.username !== req.body.userName){
            res.status(400).json({message: 'Incorrect email'});         
            return;
        }
        

        // "purchase" the car from mongodb
        const result = await CarListing.deleteOne({_id: req.body.prod});
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
          } else {
            console.log("No documents matched the query. Deleted 0 documents.");
        }

        // finished
        return res.redirect('/');


        // else {
        //     console.log("Product found");
        //     console.log(req.body);

        //     // delete the car from mongodb
            
        // }

        
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  }