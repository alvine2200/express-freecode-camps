const User = require("../models/AuthenticationModel");

const register = async (req, res) => {
  res.send("register fields here...");
};

const login = async (req, res) => {
  res.send("login fields over here...");
};

const dashboard = async (req, res) => {
  res.send("Welcome to dashboard lad ...");
};

module.exports = { register, login, dashboard };
