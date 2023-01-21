const express = require("express");
const User = require("../models/UserModel");

const home = async (req, res) => {
  res.send("homepage");
};

const login = async (req, res) => {
  res.send("login page");
};

const register = async (req, res) => {
  res.send("registration page");
};

module.exports = { home, login, register };
