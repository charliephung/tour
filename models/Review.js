const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  tripId: {
    type: Schema.Types.ObjectId,
    ref: "trips",
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = Review = mongoose.model("reviews", ReviewSchema);
