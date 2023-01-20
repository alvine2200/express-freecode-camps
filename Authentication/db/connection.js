const mongoose = require("mongoose");
require("dotenv").config();

const conn = process.env.MONGO_URL;

const connectDB = () => {
  try {
    mongoose.set("strictQuery", false);
    return mongoose.connect(conn);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
