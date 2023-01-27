const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//create token respective of users
UserSchema.methods.createJwt = async function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_TOKEN,
    {
      expiresIn: process.env.JWT_TIME,
    }
  );
};

//this can be passed to controller and name attribute displayed
UserSchema.methods.getName = function () {
  return this.name;
};

//compare password during login
UserSchema.methods.isPasswordCorrect = async function (userPassword) {
  const isPassword = await bcrypt.compare(userPassword, this.password);
  return isPassword;
};

module.exports = mongoose.model("User", UserSchema);
