const User = require("../models/AuthenticationModel");
const jwt = require("jsonwebtoken");

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
    expiresIn: "30d",
  });
  console.log(token);
  return res
    .status(200)
    .json({ status: "success", message: "user logged in", token: `${token}` });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json(`Not Auhorized to view this page`);
  }
  return res.status(200).json({ status: "success", message: "token found" });
};

module.exports = { register, login, dashboard };
