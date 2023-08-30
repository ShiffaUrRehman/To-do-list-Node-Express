const mongoose = require("mongoose");

// DB connection function separated in a module
const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/todo")
    .then(() => console.log("Connected to DB successfully"))
    .catch((err) => console.log("Error while connecting to DB", err.message));
};

module.exports.connectDB = connectDB;
