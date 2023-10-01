const navPages = [
  { name: 'Home', url: '/', active: true },
  { name: 'Sell', url: '/sell', active: false},
  { name: 'Login', url: '/auth', active: false}
]

exports.getHomePage = (req, res, next) => {
  const user = req.user;
  var login = true;
  if(!user || user === undefined) {
    login = false;
  }
  res.render('index', {
    navPages: navPages,
    login: login,
    user: user
  });
}