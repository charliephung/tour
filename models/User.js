const mongoose = require("mongoose");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
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

UserSchema.methods.generateJWT = function generateJWT() {
  const payload = {
    id: this._id,
    name: this.name,
    avatar: this.avatar
  };
  return jwt.sign(
    payload,
    keys.secretOrKey,
    // Valid in 2 hours
    { expiresIn: 3600 * 2 }
  );
};

module.exports = User = mongoose.model("users", UserSchema);
