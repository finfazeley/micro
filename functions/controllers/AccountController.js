const User = require('../models/User');
const CarListing = require('../models/CarListing');
const findUser =  require('../utils/findUserById');

// const navPages = [
//     { name: 'Home', url: '/', active: false },
//     { name: 'Sell', url: '/sell', active: false}
//     //{ name: 'Login', url: '/auth', active: false}
//   ]

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
        // navPages: navPages,
        login: login,
        user: user.username,
        userfull: user
      });
    });
  }


  // utility


getUser = async(userID) => {
    if (!userID || userID === undefined) {return null;}
    const user = await User.findById(userID);
    return user;
}