const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();

// serializeUser determines which data of the user object should be stored in the session when the user logs in.
passport.serializeUser((user, done) => {
    done(null, user.id);
})

// load more user information from the database with the help of the serialized data.
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    }).catch((err) => {
        console.log(err);
    })
})


passport.use(
    new GoogleStrategy({
        callbackURL: process.env.GOOGLE_AUTH_REDIRECT_URI,
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
        // if any user exists with this google id, return that user
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {
                new User({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);