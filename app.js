const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

app.get("/", (req, res) => res.send("Hello World!!"));

// We will later be deploying our app to Heroku, which requires us to run our server on process.env.PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));
