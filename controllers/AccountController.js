const User = require('../models/User');
const navPages = require('../utils/navPages');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');

exports.getAccount = (req, res, next) => {
    const userID = req.user;
    var login = true;
    if(!userID || userID === undefined) {
      login = false;
    }
    //console.log(login)
    
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

// this page is for the user to confirm they want to change their password
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

// function to generate token and send link to user
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

  const link = `https://tradecars.onrender.com/changePassword/${req.user}/${token}`;


  await sendEmail(fullUser.email, "Password Reset", link);

  // return to homepage
  return res.redirect('/');

}


exports.confirmPassword = async (req, res, next) => {
  //console.log(req);

  // Check user is logged in
  if(!req.user || req.user === undefined) {
    res.status(400).json({ message: "You are not logged in" });
    return;
  }
  
  if (req.body.password !== req.body.confirmPassword){
    res.status(400).json({ message: "Passwords do not match" });
    return;
  }

  // if they made it here they should be safe, so update the password

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  console.log(await User.updateOne(
    { _id: req.user },
    { $set: { password: hashedPassword } },
));


  // return to homepage
  return res.redirect('/');

}

// here is where the user actually changes their password
exports.changePassword = async (req, res, next) => {
  //console.log(req);

  // Check user is logged in
  if(!req.user || req.user === undefined) {
    res.status(400).json({ message: "You are not logged in" });
    return;
    // return res.redirect('/');
  }

  // perform checks to make sure user is allowed to change the password
  const uID = req.params.userId;
  const tok = req.params.token;

  try{
    const decoded = await jwt.verify(tok,process.env.JWT_SECRET);
    console.log(decoded);

    res.render('changePassword', {
      navPages: navPages,
      activeUrl: '/changePassword',
      login: true,
      user: req.user.username,
      userID: req.user.userID
    });

  }catch(e){
    console.log(e);
    res.status(400).json({ message: "Invalid token" });

  }
}

// utility

// function to send an email using a zoho mail account i made (google security is too good)
// note that the email will most often go in to the users spam mail
sendEmail = async (email, subject, text) => {
    try {
      var transport = nodemailer.createTransport({
        host: "smtp.zoho.com.au",
        secure: true,
        port: 465,
        auth: {
          user: "nwen.tradecars@zohomail.com.au",
          pass: "nwen304NWEN304"
        }
      });

       var mailOptions = {
            from: "nwen.tradecars@zohomail.com.au",
            to: email,
            subject: subject,
            text: text,
        };

        await transport.sendMail(mailOptions, (error, info) => {
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