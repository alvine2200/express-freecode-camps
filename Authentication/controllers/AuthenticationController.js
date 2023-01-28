const User = require("../models/AuthenticationModel");
const jwt = require("jsonwebtoken");
const validator = require("node-input-validator");
require("dotenv").config();

const register = async (req, res) => {
  res.send("register fields here...");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(500)
      .json({ status: "fail", message: "Please provide email and password" });
  }
  const id = new Date().getTime();
  const token = jwt.sign({ id, email }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });
  console.log(token);
  return res
    .status(200)
    .json({ status: "success", message: "user logged in", token: `${token}` });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  return res
    .status(200)
    .json({ status: "success", message: "user found " + req.user });
};

const ChangePassword = async (req, res) => {
  try {
    const { email, old_password, password, password_confirmation } = req.body;
    const user = await User.findOne({ email: email });
    if (await jwt.verify(password, user.email)) {
    }
  } catch (error) {}
};

const ResetPassword = async (req, res) => {
  res.send("reset-password page");
};

module.exports = { register, login, dashboard, ChangePassword, ResetPassword };
