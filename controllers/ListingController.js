const User = require('../models/User');
const CarListing = require('../models/CarListing');
const verifyToken = require('../middlewares/verifyToken');

exports.addcarlisting = async (req, res) => {
  try {
    const {make, model, year, mileage, description, price} = req.body;
    const user = await User.findById(req.user);
    if(!user) {res.status(500).json({message: 'No user found'});return;}
    const car = new CarListing({user, make, model, year, mileage, description, price});
    await car.save()
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}