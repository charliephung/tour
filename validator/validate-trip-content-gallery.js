const isEmpty = require("./isEmpty");
const Validator = require("validator");

module.exports = data => {
  let errors = {};
  data.imageUrl = data.imageUrl ? data.imageUrl : "";
  data.tripId = data.tripId ? data.tripId : "";

  if (Validator.isEmpty(data.imageUrl)) {
    errors.imageUrl = "Image url is required";
  }
  if (!Validator.isURL(data.imageUrl)) {
    errors.imageUrl = "Not a valid URL";
  }
  if (!Validator.isMongoId(data.tripId)) {
    errors.tripId = "Trip not found";
  }
  return {
    isValid: isEmpty(errors),
    errors
  };
};
