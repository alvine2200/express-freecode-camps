const express = require("express");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const tempUser = await { name, email, password: hashedPassword };

    const user = await User.create({ ...tempUser });
    if (user) {
      return res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error });
  }
};

const login = async (req, res) => {
  res.send("login page");
};

const home = async (req, res) => {
  res.send("registration page");
};

module.exports = { home, login, register };
