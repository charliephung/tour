const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateRegisterInput = require("../../validator/validate-auth-register");
const validateLoginInput = require("../../validator/validate-auth-login");

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
// @route /api/auth/google/
// @desc register or login user with google strategy
// @access Public
router.get(
  "/google/",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// @route /api/auth/google/redirect
// @desc authorize redirect route
// @access Public
router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const payload = {
      id: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar
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
  }
);

module.exports = router;
