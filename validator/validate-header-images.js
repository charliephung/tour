const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.imageUrl = !isEmpty(data.imageUrl) ? data.imageUrl : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }
  if (!Validator.isURL(data.imageUrl)) {
    errors.imageUrl = "Image url is not a valid url";
  }
  if (Validator.isEmpty(data.imageUrl)) {
    errors.imageUrl = "Image Url is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
