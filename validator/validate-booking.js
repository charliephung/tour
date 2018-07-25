const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};

  data.email = data.email ? data.email : "";
  data.name = data.name ? data.name : "";
  data.startDate = data.startDate ? data.startDate : "";
  data.endDate = data.endDate ? data.endDate : "";
  data.people = data.people ? data.people.toString() : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (data.name.length < 3) {
    errors.name = "Name cannot less than 3 characters";
  }
  if (data.startDate > data.endDate) {
    errors.endDate = "Ending date must be the date after start date";
  }
  if (Validator.isEmpty(data.startDate)) {
    errors.startDate = "Starting date is required";
  }
  if (Validator.isEmpty(data.endDate)) {
    errors.endDate = "Ending date is required";
  }
  if (Validator.isEmpty(data.people)) {
    errors.people = "People is required";
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};
