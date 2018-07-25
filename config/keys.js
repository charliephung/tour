if (process.env.NOCE_ENV === "production") {
  console.log("In pro");

  module.exports = require("./keys_pro");
} else {
  console.log("In dev");

  module.exports = require("./keys_dev");
}
