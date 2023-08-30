const express = require("express");
var bodyParser = require("body-parser");
const { connectDB } = require("./config/db");
const yup = require("yup");

// Function for DB connection
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Built-in middleware for parsing JSON payloads from incoming requests
app.use(bodyParser.json());
// Built-in middleware for pasring params/query from the url
app.use(bodyParser.urlencoded({ extended: false }));

// Routes navigator
app.use("/api/todo", require("./routes/todoRoute"));

// Function for starting our server
const start = (port) => {
  try {
    app.listen(port, () => {
      console.log(`App running/listening at: http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

// Server starts here
start(port);
