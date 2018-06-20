const Validator = require("validator");
const isEmpty = require("./isEmpty");
/* 
overview
itinerary
 */
module.exports = data => {
  let errors = {};

  data.overview = !isEmpty(data.overview) ? data.overview : "";
  data.itinerary = !isEmpty(data.itinerary) ? data.itinerary : "";

  if (Validator.isEmpty(data.overview)) {
    errors.overview = "Overview is required";
  }
  if (Validator.isEmpty(data.itinerary)) {
    errors.itinerary = "Itinerary is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
