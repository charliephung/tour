const mongoose = require("mongoose");
const { Schema } = mongoose;

const HeaderImageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = HeaderImage = mongoose.model("headerimage", HeaderImageSchema);
