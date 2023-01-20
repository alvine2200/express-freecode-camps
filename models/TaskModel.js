const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: [20, "Characters should be less than 20"],
    trim: true,
  },
  completed: {  
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
