const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};
  data.name = data.name ? data.name : "";
  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";
  data.password2 = data.password2 ? data.password2 : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }
  if (
    !Validator.isLength(data.name, {
      min: 3,
      max: 30
    })
  ) {
    errors.name = "Name must be between 3 and 30 characters";
  }
  if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (data.password !== data.password2) {
    errors.password2 = "Confirmation password not match";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirmation password is required";
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};
