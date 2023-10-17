const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const findUser =  require('../utils/findUserById');
const cookies = require('cookie-parser');
const tokenBlacklist = require('../middlewares/tokenBlackList');

const navPages = [
    { name: 'Home', url: '/', active: false },
    { name: 'Sell', url: '/sell', active: false},
    { name: 'Login', url: '/auth', active: true}
  ]
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send('<script>alert("Email already registered"); window.location.href = "/register";</script>');
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        return res.redirect('/auth');
    } catch (err) {
        res.status(500).json({ message: err.message });
        return res.redirect('/');
    }
}

exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // If user is not found, alert an error message
        if (!user) {res.send('<script>alert("User not found"); window.location.href = "/login";</script>');}

        // If user is found, compare passwords
        const validPassword = await bcrypt.compare(password, user.password);

        // If passwords don't match, send an error message
        if (!validPassword) {res.send('<script>alert("Incorrect password"); window.location.href = "/login";</script>');}

        // If passwords do match, create and send a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token, {
            httpOnly: true,
        })
        return res.redirect("/"); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.logout = (req, res) => {
    req.session.destroy();

    const token = req.cookies.token;
    if (token) {
        tokenBlacklist.push(token);
        res.clearCookie('token');
    }

    res.redirect('/');
    
}

exports.getAuthPage = (req, res, next) => {
    const userID = req.user;
  var login = true;
  if(!userID || userID === undefined) {
    login = false;
  }
  findUser(userID).then(user => {
    res.render('auth', {
      navPages: navPages,
      login: login,
      user: user
    });
  });
}

exports.getRegisterPage = (req, res, next) => {
  if(req.user) {
      return res.redirect('/');
  }

  res.render('register', {
      navPages: navPages,
      login: false
  });
}