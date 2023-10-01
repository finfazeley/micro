const User = require('../models/User');

module.exports = async(userID) => {
  if (!userID || userID === undefined) {return null;}
  const user = await User.findById(userID);
  return user.username;
}