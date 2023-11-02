const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require('./routes/users');
const app = express();
const dotenv = require("dotenv");

// enable cors
app.use(cors());

// parse application/json
app.use(bodyParser.json());

dotenv.config();
const url = process.env.MONGO_URL

// connect to the database
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

// define routes
app.use('/users',users);


// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});