const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};
  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};
