const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    maxlength: [25, "Maximum characer should be less than 25"],
  },
  email: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: Number,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", RegistrationSchema);
