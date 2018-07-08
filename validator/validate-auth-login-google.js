const Validator = require("validator");
const isEmpty = require("./isEmpty");

/* 
accessToken
userEmail
username
 */

module.exports = data => {
  let errors = {};
  data.accessToken = data.accessToken ? data.accessToken : "";
  data.userEmail = data.userEmail ? data.userEmail : "";
  data.username = data.username ? data.username : "";

  if (!Validator.isEmail(data.userEmail)) {
    errors.email = "Email is not valid";
  }
  if (Validator.isEmpty(data.userEmail)) {
    errors.email = "Email is required";
  }
  if (Validator.isEmpty(data.accessToken)) {
    errors.accessToken = "Access token is required";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};
