const navPages = [
  { name: 'Home', url: '/', onLogOut: true, onLogIn: true },
  { name: 'Sell', url: '/sell', onLogOut: false, onLogIn: true},
  { name: 'Register', url: '/register', onLogOut: false, onLogIn: false},
  { name: 'Login', url: '/auth', onLogOut: false, onLogIn: false},
  { name: 'My Listings', url: '/myListings', onLogOut: false, onLogIn: true},
  { name: 'Account', url: '/account', onLogOut: false, onLogIn: true}
]

export default navPages;