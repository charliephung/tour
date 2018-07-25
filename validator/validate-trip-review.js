const Validator = require("validator");
const isEmpty = require("./isEmpty");
/* 
userId
text
 */
module.exports = data => {
  let errors = {};

  data.userId = !isEmpty(data.userId) ? data.userId : "";
  data.text = !isEmpty(data.text) ? data.text : "";

  if (data.text.length < 3) {
    errors.text = "Text cannot less than 3 characters";
  }
  if (Validator.isEmpty(data.userId)) {
    errors.userId = "userId is required";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
