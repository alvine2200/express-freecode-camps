const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [30, "Name should not be more than 30 characters"],
  },
  email: {
    type: String,
    required: true,
    maxLength: [30, "email should not be more than 30 characters"],
    unique: true,
    match: ["Regex", "please provide a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

module.exports = mongoose.model("Job", JobSchema);
