const express = require('express');
const router = express.Router();

const CarListing = require('./schemas/CarListing');

// Sorted search
router.get('/year', async (req, res) => {
  var listings = await CarListing.find().cursor().toArray();
  listings.sort((a, b) => {
    if (a.year > b.year) {
      return 1;
    }
    return -1;
  });
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
    newListings.push(newList);
  }
  res.send(JSON.stringify(newListings));
})

module.exports = router;