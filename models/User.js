const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "member"
  },
  avatar: {
    type: String
  },
  googleId: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = User = mongoose.model("users", UserSchema);
