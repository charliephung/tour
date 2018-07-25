const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const passport = require("passport");

// app config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app use passport
app.use(passport.initialize());
// Init passport
require("./config/passport-config")(passport);
// Add routes
const headerImagesRoutes = require("./routes/api/header-image-routes");
const tripsRoutes = require("./routes/api/trip-routes");
const authRoutes = require("./routes/api/user-routes");

// Connect database
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("Data base connected"))
  .catch(err => console.log(err));

app.use("/api/header-images", headerImagesRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/auth", authRoutes);

// Port setup
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
