const router = require("express").Router();
const errormsg = require("../../messages/status-messages");
const Trip = require("../../models/Trip");
const TripContent = require("../../models/TripContent");
const Review = require("../../models/Review");
const passport = require("passport");
// Validate
const isAdmin = require("../../middleware/isAdmin");

const Validator = require("validator");
const validateTrip = require("../../validator/validate-trip");
const validateTripContent = require("../../validator/validate-trip-content");
const validateTripContentGallery = require("../../validator/validate-trip-content-gallery");
const validateTripReview = require("../../validator/validate-trip-review");

router.post(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json(req.user);
  }
);

// @route /api/trips/:tripId
// @desc get 1 trip at request location by id
// @access public
router.get("/:tripId", (req, res) => {
  let errors = {};
  const location = req.params.location;
  const regex = new RegExp(".*" + location + ".*", "i");
  Trip.findOne({
    _id: req.params.tripId
  })
    .populate("reviews")
    .populate({
      path: "reviews",
      populate: {
        path: "userId",
        model: "users",
        select: ["_id", "name", "avatar"]
      }
    })
    .populate("tripContent")
    .then(trips => {
      if (trips.length === 0) {
        errors.error = errormsg["404"];
        return res.status(400).json(errors);
      }
      return res.json(trips);
    })
    .catch(err => {
      console.log(err);

      errors.error = errormsg["500"];
      return res.status(500).json(errors);
    });
});

// @route /api/trips/location/:location
// @desc get all trip at request location
// @access public
router.get("/location/:location", (req, res) => {
  let errors = {};
  const location = req.params.location;
  const regex = new RegExp(".*" + location + ".*", "i");
  Trip.find({
    location: regex
  })
    .populate("reviews")
    .then(trips => {
      if (trips.length === 0) {
        errors.error = errormsg["404"];
        return res.status(400).json(errors);
      }
      return res.json(trips);
    })
    .catch(err => {
      console.log(err);

      errors.error = errormsg["500"];
      return res.status(500).json(errors);
    });
});

// @route /api/trips/trip/
// @desc Post a trip at a location
// @access Private Admin
router.post(
  "/trip",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res) => {
    let { isValid, errors } = validateTrip(req.body);

    if (!isValid) {
      errors.error = errormsg["400"];
      return res.status(400).json(errors);
    }

    const inputTrip = {
      title: req.body.title,
      location: req.body.location,
      link: req.body.link,
      pricePerPerson: req.body.pricePerPerson,
      pricePerDay: req.body.pricePerDay,
      headerImageUrl: req.body.headerImageUrl
    };

    Trip.findOne({
      link: req.body.link.toString()
    })
      .populate("tripContent")
      .then(found => {
        if (found) {
          errors.link = "link must be unique";
          return res.status(400).json(errors);
        }
        new Trip(inputTrip).save().then(trip => {
          return res.json(trip);
        });
      })
      .catch(err => {
        errors.error = errormsg["500"];
        return res.status(500).json(errors);
      });
  }
);
// @route /api/trips/:tripId/content
// @desc Create content of trip
// @access Private Admin
router.post(
  "/:tripId/content",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res) => {
    let { isValid, errors } = validateTripContent(req.body);
    if (!isValid) {
      errors.error = errormsg["400"];
      return res.status(400).json(errors);
    }

    Trip.findOne({
      _id: req.params.tripId.toString()
    })
      .then(foundTrip => {
        if (!foundTrip) {
          errors.error = errormsg["404"];
          return res.status(404).json(errors);
        }
        //   Create content
        new TripContent({
          tripId: req.params.tripId,
          overview: req.body.overview,
          itinerary: req.body.itinerary
        })
          .save()
          // If save success
          .then(content => {
            foundTrip.tripContent = {
              _id: content._id
            };
            foundTrip
              .save()
              .then(updatedTrip => {
                return res.json(updatedTrip);
              })
              .catch(err => {
                console.log(err);
                errors.error = errormsg["500"];
                return res.status(500).json(errors);
              });
          });
      })
      .catch(err => {
        console.log(err);

        errors.error = errormsg["404"];
        return res.status(404).json(errors);
      });
  }
);
// @route /api/trips/:tripId/gallery
// @desc Add image to trip gallery
// @access Private
router.post(
  "/:tripId/gallery/",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res) => {
    // Validate input
    let { isValid, errors } = validateTripContentGallery({
      imageUrl: req.body.imageUrl,
      tripId: req.params.tripId
    });

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Find the trip by Id
    TripContent.findOne({
      tripId: req.params.tripId.toString()
    })
      .then(trip => {
        if (!trip) {
          // If not found trip
          errors.tripId = "Trip not found";
          return res.status(404).json(errors);
        }
        // Add image url to trip gallery array
        trip.gallery.push(req.body.imageUrl);
        trip.save().then(updatedTrip => {
          return res.json(updatedTrip);
        });
      })
      .catch(err => {
        errors.error = errormsg["500"];
        return res.status(500).json(errors);
      });
  }
);
// @route /api/trips/:tripId/review
// @desc add review to trip
// @access Private
router.post(
  "/:tripId/review",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { isValid, errors } = validateTripReview(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Trip.findOne({
      _id: req.params.tripId
    })
      .then(foundTrip => {
        foundTrip
          .addReview({
            tripId: req.params.tripId,
            text: req.body.text,
            userId: req.user._id
          })
          .then(newReview => {
            foundTrip.reviews.push(newReview._id);
            foundTrip.save().then(() => {
              Review.findOne({ _id: newReview._id })
                .populate("userId", ["avatar", "name", "_id"])
                .then(result => {
                  return res.json(result);
                });
            });
          });
      })
      .catch(err => {
        console.log(err);

        errors.error = errormsg["404"];
        return res.status(404).json(errors);
      });
  }
);
// @route /api/trips/:tripId/review/:commentId
// @desc DELETE a review of trip
// @access Private
router.delete(
  "/:tripId/review/:commentId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user._id === req.body.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    Trip.findOne({ _id: req.params.tripId }).then(trip => {
      trip
        .removeReview(req.params.commentId)
        .then(newTrip => {
          return res.status(202).json({ success: "Deleted successfully" });
        })
        .catch(err => {
          return res.status(404).json(err);
        });
    });
  }
);

// @route /api/trips/:tripId/rate
// @desc rate a trip
// @access Private
// TODO
router.delete(
  "/:tripId/rate",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);

    // Trip.findOne({ _id: req.params.tripId }).then(trip => {
    //   trip
    //     .removeReview(req.params.commentId)
    //     .then(newTrip => {
    //       return res.status(202).json({ success: "Deleted successfully" });
    //     })
    //     .catch(err => {
    //       return res.status(404).json(err);
    //     });
    // });
  }
);

module.exports = router;
