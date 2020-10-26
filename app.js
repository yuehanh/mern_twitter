const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

// We will later be deploying our app to Heroku, which requires us to run our server on process.env.PORT
const port = process.env.PORT || 5000;

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require("body-parser");

const passport = require("passport");

app.listen(port, () => console.log(`Server is running on port ${port}`));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/tweets", tweets);
