module.exports = navPages = [
  { name: 'Home', url: '/', onLogOut: true, onLogIn: true },
  { name: 'Sell', url: '/sell', onLogOut: false, onLogIn: true},
  { name: 'Register', url: '/register', onLogOut: true, onLogIn: false},
  { name: 'My Listings', url: '/myListings', onLogOut: false, onLogIn: true},
  { name: 'Account', url: '/account', onLogOut: false, onLogIn: true},
  { name: 'Login', url: '/auth', onLogOut: true, onLogIn: false},
  { name: 'Logout', url: '/logout', onLogOut: false, onLogIn: true}
]