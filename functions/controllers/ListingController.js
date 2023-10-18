const User = require('../models/User');
const CarListing = require('../models/CarListing');
const findUser =  require('../utils/findUserById');

const navPages = [
  { name: 'Home', url: '/', active: false },
  { name: 'Sell', url: '/sell', active: true},
  { name: 'Login', url: '/auth', active: false}
]

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
    await car.save()
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
      login: login,
      user: user
    });
  });
}

// Utility Functions

exports.getAllListings = async () => {
  const listings = await CarListing.find().cursor().toArray();
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
  console.log(newListings);
  return newListings;
}