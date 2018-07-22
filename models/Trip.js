const mongoose = require("mongoose");
const Review = require("./Review");
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
      type: Schema.Types.ObjectId,
      ref: "reviews"
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

TripSchema.methods.addReview = review => {
  return new Promise((resolve, reject) => {
    new Review({
      tripId: review.tripId,
      userId: review.userId,
      text: review.text
    })
      .save()
      .then(newReview => {
        resolve(newReview);
      })
      .catch(err => {
        reject(null);
      });
  });
};

TripSchema.methods.removeReview = function(id) {
  return new Promise((resolve, reject) => {
    const index = this.reviews.indexOf(id);
    if (index === -1) {
      reject({ error: "Not found" });
    } else {
      this.reviews.splice(index, 1);
      this.save().then(newReview => {
        Review.findByIdAndRemove(id)
          .then(res => {
            resolve(newReview);
          })
          .catch(err => {
            reject(-1);
          });
      });
    }
  });
};

module.exports = Trip = mongoose.model("trips", TripSchema);
