const mongoose = require("mongoose");
const { Schema } = mongoose;

const TripSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  pricePerPerson: {
    type: Number,
    required: true
  },
  headerImageUrl: {
    type: String,
    required: true
  },
  tripContent: {
    type: Schema.Types.ObjectId,
    ref: "tripcontents"
  },
  reviews: [
    {
      review: {
        type: Schema.Types.ObjectId,
        ref: "reviews"
      }
    }
  ],
  rating: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      rate: {
        type: Number,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Trip = mongoose.model("trips", TripSchema);
