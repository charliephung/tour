const Validator = require("validator");
const isEmpty = require("./isEmpty");
/* 
title  required
location required
link required
pricePerDay required
pricePerPerson required
headerImageUrl required
tripContent
reviews
rating
 */
module.exports = data => {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.link = !isEmpty(data.link) ? data.link : "";
  data.pricePerDay = !isEmpty(data.pricePerDay)
    ? data.pricePerDay.toString()
    : "";
  data.pricePerPerson = !isEmpty(data.pricePerPerson)
    ? data.pricePerPerson.toString()
    : "";
  data.headerImageUrl = !isEmpty(data.headerImageUrl)
    ? data.headerImageUrl.toString()
    : "";

  if (!Validator.isURL(data.headerImageUrl)) {
    errors.headerImageUrl = "Image url is not a valid url";
  }

  if (!Validator.isNumeric(data.pricePerDay)) {
    errors.pricePerDay = "Price per day must be number";
  }
  if (!Validator.isNumeric(data.pricePerPerson)) {
    errors.pricePerPerson = "Price per person must be number";
  }
  if (data.link.indexOf(" ") !== -1) {
    errors.link = "Link cannot contain any white space";
  }
  if (Validator.isNumeric(data.link)) {
    errors.link = "Link cannot contain just number";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = "Location  is required";
  }
  if (Validator.isEmpty(data.link)) {
    errors.link = "Link is required";
  }
  if (Validator.isEmpty(data.pricePerDay)) {
    errors.pricePerDay = "pricePerDay  is required";
  }
  if (Validator.isEmpty(data.pricePerPerson)) {
    errors.pricePerPerson = "pricePerPerson  is required";
  }
  if (Validator.isEmpty(data.headerImageUrl)) {
    errors.headerImageUrl = "Header Image Url is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
