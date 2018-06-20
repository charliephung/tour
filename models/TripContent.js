const mongoose = require("mongoose");
const { Schema } = mongoose;

const TripContentSchema = new Schema({
  tripId: {
    type: Schema.Types.ObjectId,
    ref: "trips"
  },
  overview: {
    type: String,
    required: true
  },
  itinerary: {
    type: String,
    required: true
  },
  gallery: [
    {
      type: String
    }
  ]
});

module.exports = TripContent = mongoose.model(
  "tripcontents",
  TripContentSchema
);
