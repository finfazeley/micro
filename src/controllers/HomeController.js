const User = require('../models/User');
const findUser =  require('../utils/findUserById');
const ListingController = require('./ListingController');
const navPages = require('../utils/navPages');

var userNameCache = {
  users: {},
  lastUpdate: 0,
  valid: false
}

exports.getHomePage = async (req, res, next) => {
  const userID = req.user;
  var login = true;

  if(!userID || userID === undefined) {
    login = false;
  }
  var userName;
  if (userNameCache.valid && new Date().getTime() - userNameCache.lastUpdate < 300000) {
    userName = userNameCache.users.userID;
  } else {
    userName = await findUser(userID);
    userNameCache.lastUpdate = new Date().getTime();
    userNameCache.valid = true;
    userNameCache.users.userID = userName;
  }
  const listings = await ListingController.getAllListings();
  res.render('index', {
    navPages: navPages,
    activeUrl: '/',
    login: login,
    user: userName,
    listings: listings
  })
}