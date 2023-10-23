const CarListing = require("./schemas/CarListing");

var listingCache = {
  listings: [],
  lastUpdate: 0,
  valid: false
}

exports.sortByYear = async(req, res) => {
  const order = (req.query.order === "asc") ? 1 : -1;
  const listings = await getListings();
  listings.sort((a, b) => {
    if (a.year > b.year) {
      return 1*order;
    }
    return -1*order;
  });
  var newListings = buildListings(listings);
  res.send(JSON.stringify(newListings));
}

exports.sortByPrice = async(req, res) => {
  const order = (req.query.order === "asc") ? 1 : -1;
  const listings = await getListings();
  listings.sort((a, b) => {
    if (a.price > b.price) {
      return 1*order;
    }
    return -1*order;
  });
  var newListings = buildListings(listings);
  res.send(JSON.stringify(newListings));
}

exports.sortByMileage = async(req, res) => {
  const order = (req.query.order === "asc") ? 1 : -1;
  const listings = await getListings();
  listings.sort((a, b) => {
    if (a.mileage > b.mileage) {
      return 1*order;
    }
    return -1*order;
  });
  var newListings = buildListings(listings);
  res.send(JSON.stringify(newListings));
}

const getListings = async () => {
  if (listingCache.valid && new Date().getTime() - listingCache.lastUpdate < 300000) {
    return listingCache.listings;
  }
  const cursor = CarListing.find().cursor();
  const listings = [];
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    listings.push(doc);
  }
  listingCache.listings = listings;
  listingCache.lastUpdate = new Date().getTime();
  listingCache.valid = true;
  return listings;
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