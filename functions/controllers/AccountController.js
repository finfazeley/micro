const User = require('../models/User');
const CarListing = require('../models/CarListing');
const findUser =  require('../utils/findUserById');
const navPages = require('../utils/navPages');

exports.getAccount = (req, res, next) => {
    const userID = req.user;
    var login = true;
    if(!userID || userID === undefined) {
      login = false;
    }
    //console.log(login);
    
    //const listings = await ListingController.getUserListings();
    getUser(userID).then(async user => {
      res.render('account', {
        navPages: navPages,
        activeUrl: '/account',
        login: login,
        user: user.username,
        userData: user
      });
    });
  }

exports.getReset = (req, res, next) => {
  const userID = req.user;
  var login = true;
  if(!userID || userID === undefined) {
    login = false;
  }
  //console.log(login);
  
  //const listings = await ListingController.getUserListings();
  getUser(userID).then(async user => {
    res.render('reset', {
      navPages: navPages,
      activeUrl: '/resetPassword',
      login: login,
      user: user.username,
      userID: userID
    });
  });
}

exports.postReset = (req, res, next) => {
  console.log(req.body);
  const userID = req.user;
  var login = true;
  if(!userID || userID === undefined) {
    login = false;
  }
  //console.log(login);
  
  //const listings = await ListingController.getUserListings();
  getUser(userID).then(async user => {
    res.render('reset', {
      navPages: navPages,
      activeUrl: '/resetPassword/${userID}',
      login: login,
      user: user.username,
      userID: userID
    });
  });
}

  // utility


getUser = async(userID) => {
    if (!userID || userID === undefined) {return null;}
    const user = await User.findById(userID);
    return user;
}