const mongoose = require('mongoose');

const CarListingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please select an owner']
  },
  make: String,
  model: String,
  year: Number,
  mileage: Number,
  description: String,
  price: Number
})

module.exports = mongoose.model('CarListing', CarListingSchema);