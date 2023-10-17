const User = require('../models/User');
const findUser =  require('../utils/findUserById');
const ListingController = require('./ListingController');

const navPages = [
  { name: 'Home', url: '/', active: true },
  { name: 'Sell', url: '/sell', active: false},
  { name: 'Register', url: '/register', active: false},
  { name: 'Login', url: '/auth', active: false}
]

exports.getHomePage = async (req, res, next) => {
  const userID = req.user;
  var login = true;
  // print userID to console
  console.log(userID);
  if(!userID || userID === undefined) {
    login = false;
  }
  const userName = await findUser(userID);
  const listings = await ListingController.getAllListings();
  res.render('index', {
    navPages: navPages,
    login: login,
    user: userName,
    listings: listings
  })
}