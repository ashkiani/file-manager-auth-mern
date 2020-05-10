require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
// Routes
require("./routes/apiRoutes")(app);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

async function startServer() {
  try {
    const URI = process.env.MONGODB_URI;
    console.log("URI:");
    console.log(URI);

    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });
    app.listen(PORT, () => {
      console.log(`🌎 ==> API server now on port ${PORT}!`);
    });
  } catch (err) {
    console.log("Error:");
    console.log(err);
  }
}

startServer();