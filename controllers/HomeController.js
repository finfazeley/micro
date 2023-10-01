const User = require('../models/User');

const navPages = [
  { name: 'Home', url: '/', active: true },
  { name: 'Sell', url: '/sell', active: false},
  { name: 'Login', url: '/auth', active: false}
]

exports.getHomePage = (req, res, next) => {
  const userID = req.user;
  var login = true;
  if(!userID || userID === undefined) {
    login = false;
  }
  findUser(userID).then(user => {
    res.render('index', {
      navPages: navPages,
      login: login,
      user: user
    });
  });
}

const findUser = async(userID) => {
  const user = await User.findById(userID);
  return user.username;
}