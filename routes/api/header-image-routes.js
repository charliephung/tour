const router = require("express").Router();
const HeaderImage = require("../../models/HeaderImage");
const errormsg = require("../../messages/status-messages");
const validateHeaderImage = require("../../validator/validate-header-images");
const isAdmin = require("../../middleware/isAdmin");
const passport = require("passport");
// @route GET /api/header-images
// @desc Get landing page data
// @access PUBLIC
router.get("/", (req, res) => {
  let errors = {};
  HeaderImage.find({})
    .then(images => {
      if (images.length === 0) {
        errors.error = errormsg["404"];
        return res.status(404).json(errors);
      }
      return res.json(images);
    })
    .catch(err => {
      errors.error = errormsg["500"];
      return res.status(500).json(errors);
    });
});

// @route POST /api/header-images
// @desc add new header image
// @acess Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res) => {
    let { isValid, errors } = validateHeaderImage(req.body);
    if (!isValid) {
      errors.error = errormsg["400"];
      return res.status(400).json(errors);
    }

    const inputHeaderImage = {
      title: req.body.title,
      imageUrl: req.body.imageUrl
    };

    new HeaderImage(inputHeaderImage)
      .save()
      .then(image => {
        return res.json(image);
      })
      .catch(err => {
        errors.error = errormsg["500"];
        return res.status(500).json(errors);
      });
  }
);

module.exports = router;
