exports.postReset = async (req, res, next) => {
  console.log(req);

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

// function to send an email using a zoho mail account i made (google security is too good)
// note that the email will most often go in to the users spam mail
sendEmail = async (req, res) => {
  try {
    const email = req.body.email;

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
