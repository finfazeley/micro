const CarListing = require("./schemas/CarListing");

exports.sortByYear = async(req, res) => {
  // console.log(CarListing.find());
  const order = (req.query.order === "asc") ? 1 : -1;
  // console.log(order);

  const cursor = CarListing.find().cursor();
  const listings = [];
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      listings.push(doc);
  }

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
  const cursor = CarListing.find().cursor();
  const listings = [];
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    listings.push(doc);
  }

  //var listings = await CarListing.find().cursor().toArray();
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
  const cursor = CarListing.find().cursor();
  const listings = [];
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    listings.push(doc);
  }
  //var listings = await CarListing.find().cursor().toArray();
  listings.sort((a, b) => {
    if (a.mileage > b.mileage) {
      return 1*order;
    }
    return -1*order;
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