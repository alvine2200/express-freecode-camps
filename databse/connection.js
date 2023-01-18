const mongoose = require("mongoose");
const url = require("dotenv").config();
const conn = process.env.MONGO_URL;

const connectDB = (url) => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(conn);
};

module.exports = connectDB;
