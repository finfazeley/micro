const User = require('../models/User');

module.exports = async(userID) => {
  const user = await User.findById(userID);
  return user.username;
}