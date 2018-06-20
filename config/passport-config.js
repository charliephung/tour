const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
const User = require("../models/User");
const config = require("../config/keys");

// Jwt Option
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;
// Check for valid access token
module.exports = passport => {
  // SerializeUser
  //   passport.serializeUser((user, done) => {
  //     done(null, user.id);
  //   });
  //   // DeSerializeUser
  //   passport.deserializeUser((id, done) => {
  //     User.findById(id).then(user => {
  //       done(null, user.id);
  //     });
  //   });

  // Google strategy
  passport.use(
    new GoogleStrategy(
      {
        //   Google options
        callbackURL: "/api/auth/google/redirect",
        clientID: config.clientID,
        clientSecret: config.clientSecret
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({
          googleId: profile._json.id
        }).then(currentUser => {
          // if found user
          if (currentUser) {
            return done(null, currentUser);
          } else {
            //   Create new user
            new User({
              name: profile._json.displayName,
              googleId: profile._json.id,
              avatar: profile._json.image.url
            })
              .save()
              .then(newUser => {
                return done(null, newUser);
              });
          }
        });
      }
    )
  );

  // Jwt strategy
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // Find user of this token
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            // user can be access in req.user
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
