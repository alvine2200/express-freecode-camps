const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company is required"],
      maxLength: [50, "Company should not be more than 30 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      maxLength: [100, "Position should not be more than 30 characters"],
    },
    status: {
      type: String,
      enum: ["declined", "interview", "pending"],
      default: "pending",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: [true, "Provide a user"],
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
