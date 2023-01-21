const mongoose = require("mongoose");
const { isEmail } = require("express-validator");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [30, "Name should not be more than 30 characters"],
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    maxlength: [30, "email should not be more than 30 characters"],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
