const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// put identifying information into cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// pull identifying information out of cookie and turn it back into a user in db
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // already have a record with given profile ID
          done(null, existingUser);
        } else {
          // don't have a user record with this ID
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
      // console.log('access token', accessToken);
      // console.log('refresh token', refreshToken);
      // console.log('profile', profile);
    }
  )
);
