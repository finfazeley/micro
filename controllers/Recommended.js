const User = require('../models/User');
const CarListing = require('../models/CarListing');
const findUser =  require('../utils/findUserById');
const navPages = require('../utils/navPages');

exports.getRecommended = async (req, res, next) => {
  const userID = req.user;
  var login = true;
  if(!userID || userID === undefined) {
    login = false;
    res.render('recommended', {
        navPages: navPages,
        activeUrl: '/recommended',
        login: login
    })
  }
  else{
    const userName = await findUser(userID);
    const listings = await getRecs(req.user);
    res.render('recommended', {
      navPages: navPages,
      activeUrl: '/recommended',
      login: login,
      user: userName,
      listings: listings
    })
  }
  
  
}

getRecs = async (userID) => {
    const listings = await CarListing.find().cursor().toArray();
    var newListings = [];

    // get users purchase history
    const user =  await User.findById(userID);
    const purchases = user.purchases;

    if (purchases === undefined){
        console.log("NO BUY");
        // console.log(purchases);
        return newListings;
    }

    if(purchases.length === 0){
      console.log("No previous purchases");
        // console.log(purchases);
      return newListings;
    }

    const average = purchases => purchases.reduce((a, b) => a + b) / purchases.length;
    const averagePurchase = average(purchases)
    // console.log(averagePurchase);

    for await (const list of listings) {
   
        // the listing has to be within this range to be recommended
        if (list.price >= (averagePurchase - 5000) && list.price <= (5000 + averagePurchase) && list.user.name !== user.username) {
            newList = {
                id: list._id.toHexString(),
                user: list.user.name,
                make: list.make,
                model: list.model,
                year: list.year,
                mileage: list.mileage,
                description: list.description,
                price: list.price
              }
              newListings.push(newList)
        }
    }
    // console.log(newListings);
    return newListings;
  }