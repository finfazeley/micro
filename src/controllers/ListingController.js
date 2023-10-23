const User = require('../models/User');
const CarListing = require('../models/CarListing');
const findUser =  require('../utils/findUserById');
const navPages = require('../utils/navPages');

var listingCache = {
  listings: [],
  lastUpdate: 0,
  valid: false
}

exports.addcarlisting = async (req, res) => {
  try {
    const {make, model, year, mileage, description, price} = req.body;
    const userID = await User.findById(req.user);
    if(!userID) {res.status(500).json({message: 'No user found'});return;}
    const user = {
      userID: userID,
      name: userID.username
    }
    const car = new CarListing({user, make, model, year, mileage, description, price});
    await car.save();
    listingCache.valid = false;
    return res.redirect('/');
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

exports.getSellPage = (req, res, next) => {
  const userID = req.user;
  var login = true;
  if(!userID || userID === undefined) {
    login = false;
  }
  findUser(userID).then(user => {
    res.render('sell', {
      navPages: navPages,
      activeUrl: '/sell',
      login: login,
      user: user
    });
  });
}

// Utility Functions

exports.getAllListings = async () => {
  if (listingCache.valid && new Date().getTime() - listingCache.lastUpdate < 300000) {
    return listingCache.listings;
  }
  const listings = await CarListing.find().limit(20).cursor().toArray();
  var newListings = [];
  for await (const list of listings) {
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
  listingCache.listings = newListings;
  listingCache.valid = true;
  listingCache.lastUpdate = new Date().getTime();
  return newListings;
}

