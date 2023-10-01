const navPages = [
  { name: 'Home', url: '/', active: true },
  { name: 'Sell', url: '/sell', active: false},
  { name: 'Login', url: '/auth', active: false}
]

exports.getHomePage = (req, res, next) => {
  res.render('index', {
    navPages: navPages
  });
}