const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const axios = require("axios");
const validateRegisterInput = require("../../validator/validate-auth-register");
const validateLoginInput = require("../../validator/validate-auth-login");
const validateLoginInputGoogle = require("../../validator/validate-auth-login-google");

// @route /api/auth/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  let { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email
  }).then(currentUser => {
    //   If email already use
    if (currentUser) {
      errors.email = "Email already been used";
      return res.status(400).json(errors);
    }
    // Register user with provide info
    // hasing password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash
        })
          .save()
          .then(newUser => {
            return res.json(newUser);
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  });
});
// @route /api/auth/login
// @desc Login user with email and password
// @access Public
router.post("/login", (req, res) => {
  let { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //   Check if email exist
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    // Check password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (!isMatch) {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
      //   If correct
      const payload = {
        id: user._id,
        name: user.name,
        avatar: user.avatar
      };
      //   Create access token and send to client
      jwt.sign(
        payload,
        keys.secretOrKey,
        // Valid in 2 hours
        { expiresIn: 3600 * 2 },
        (err, token) => {
          if (err) throw err;
          return res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    });
  });
});

router.post("/google/", (req, res) => {
  // Validate data from client
  const { isValid, errors } = validateLoginInputGoogle(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Get data from client
  const { accessToken, userEmail, username, avatar } = req.body;
  const verifyGoogleUrl = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`;
  // Check if the user info is valid by this link
  axios
    .get(verifyGoogleUrl.toString())
    .then(result => {
      const { verified_email, email, user_id } = result.data;
      // If valid
      if (verified_email === true && userEmail === email) {
        // Find if user exist by googleId
        User.findOne({ googleId: user_id }).then(user => {
          if (user) {
            // Send user token
            const token = user.generateJWT();
            return res.json({
              success: true,
              token: "Bearer " + token
            });
          } else {
            // Create new user
            new User({
              name: username,
              avatar: avatar,
              googleId: user_id,
              email: userEmail
            })
              .save()
              .then(newUser => {
                // Then send token
                const token = newUser.generateJWT();
                return res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
          }
        });
      }
    })
    .catch(err => {
      return res
        .status(400)
        .json({ error: "Data that you provided is not Valid" });
    });
});

// @route /api/auth/google/
// @desc register or login user with google strategy
// @access Public
// router.get(
//   "/google/",
//   passport.authenticate(
//     "google",
//     {
//       scope: ["profile"]
//     },
//     { display: "popup" }
//   )
// );

// @route /api/auth/google/redirect
// @desc authorize redirect route
// @access Public
// router.get(
//   "/google/redirect",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     const payload = {
//       id: req.user._id,
//       name: req.user.name,
//       avatar: req.user.avatar
//     };
//     //   Create access token and send to client
//     jwt.sign(
//       payload,
//       keys.secretOrKey,
//       // Valid in 2 hours
//       { expiresIn: 3600 * 2 },
//       (err, token) => {
//         if (err) throw err;

//         return res.json({
//           success: true,
//           token: "Bearer " + token
//         });
//       }
//     );
//   }
// );

module.exports = router;
