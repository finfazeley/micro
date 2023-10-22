const User = require('../models/User');
const CarListing = require('../models/CarListing');
const findUser =  require('../utils/findUserById');
const navPages = require('../utils/navPages');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

exports.getAccount = (req, res, next) => {
    const userID = req.user;
    var login = true;
    if(!userID || userID === undefined) {
      login = false;
    }
    //console.log(login);
    
    //const listings = await ListingController.getUserListings();
    getUser(userID).then(async user => {
      res.render('account', {
        navPages: navPages,
        activeUrl: '/account',
        login: login,
        user: user.username,
        userData: user
      });
    });
  }

exports.getReset = (req, res, next) => {
  const userID = req.user;
  var login = true;
  if(!userID || userID === undefined) {
    login = false;
  }

  //const listings = await ListingController.getUserListings();
  getUser(userID).then(async user => {
    res.render('reset', {
      navPages: navPages,
      activeUrl: '/resetPassword',
      login: login,
      user: user.username,
      userID: userID
    });
  });
}

exports.postReset = async (req, res, next) => {
  //console.log(req);

  // Check user is logged in
  if(!req.user || req.user === undefined) {
    res.status(400).json({ message: "You are not logged in" });
    return;
    // return res.redirect('/');
  }

  // Check user email matches logged in user
  const fullUser = await getUser(req.user);
  
  if (req.body.email !== fullUser.email){
    res.status(400).json({ message: "Invalid Email" });
    return;
    // return res.redirect('/');
  }

  // generate token for user and send email
  const token = jwt.sign({ userId: fullUser.userID }, process.env.JWT_SECRET, { expiresIn: '5m' });
  await sendEmail(fullUser.email, "Password reset", token);

  // return to homepage
  return res.redirect('/');

}

// utility
sendEmail = async (email, subject, text) => {
    try {
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "fff0b9d2a5de58",
          pass: "a1d82c487dd831"
        }
      });

       var mailOptions = {
            from: "admin@tradecars.onrender.com",
            to: email,
            subject: subject,
            text: text,
        };

        transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};
  


getUser = async(userID) => {
    if (!userID || userID === undefined) {return null;}
    const user = await User.findById(userID);
    return user;
}