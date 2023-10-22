const CarListing = require("./schemas/CarListing");

exports.sortByYear = async(req, res) => {
  var listings = await CarListing.find().cursor().toArray();
  listings.sort((a, b) => {
    if (a.year > b.year) {
      return 1;
    }
    return -1;
  });
  var newListings = buildListings(listings);
  res.send(JSON.stringify(newListings));
}

const buildListings = (listings) => {
  var newListings = [];
  for (const list of listings) {
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
  return newListings;
}