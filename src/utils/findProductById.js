const Product = require('../models/CarListing');

module.exports = async(pID) => {
  if (!pID || pID === undefined) {return null;}
  const prod = await Product.findById(pID);
  return prod;
}