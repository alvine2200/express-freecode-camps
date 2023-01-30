const express = require("express");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const validator = require("node-input-validator");
require("dotenv").config();

const register = async (req, res) => {
  try {
    // const { name, email, password } = req.body;
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // const tempUser = await { name, email, password: hashedPassword };
    const checkEmail = async function () {
      const { email } = req.body;
      const mail = await User.findOne({ email });
      if (mail) {
        return res
          .status(500)
          .json({ status: "failed", message: "email already taken" });
      }
    };
    checkEmail();
    const user = await User.create({ ...req.body });
    const token = await user.createJwt();
    if (user) {
      return res.status(201).json({
        status: "success",
        message: "User created successfully",
        name: user.getName(),
        data: user,
        token: token,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Please complete your details and submit again",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "User not found, Enter correct details",
      });
    }
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid credentials, try again",
      });
    }
    const token = await user.createJwt();
    sendMail();
    return res
      .status(200)
      .json({ status: "successful", data: user, token: token });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ status: "failed", message: "something went wrong" });
  }
};

const home = async (req, res) => {
  res.send("home page");
};

const ChangePassword = async (req, res) => {
  try {
    const { old_password, password } = req.body;
    const user = await User.findOne({ _id: req.user.userId });

    if (await bcrypt.compare(old_password, user.password)) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newPassword = await user.updateOne({
        password: hashedPassword,
      });

      return res.status(200).json({
        status: "success",
        message: "Password Changed successfully... ",
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message:
          "Old password is wrong, Can't proceed with change password, try again... ",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

const sendMail = async (req, res) => {
  const { email } = req.body;
  const config = {
    service: "gmail",
    auth: {
      user: process.env.user,
      password: process.env.password,
    },
  };
  const transporter = await nodemailer.createTransport(config);

  let MailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js",
    },
  });

  let response = {
    body: {
      name: "Alvine registration Syatem",
      intro: "Your monthly bill has arrived",
      table: {
        data: [
          {
            item: "Nodemailer testing gmail setup",
            description: "description for product goes in here",
            price: "10500.00 ksh.",
          },
        ],
      },
      outro: "Looking forward to more business",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.user,
    to: email,
    subject: "registration email",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.log(error);
    });
};

const ResetPassword = async (req, res) => {
  try {
    const emailtemplate =
      '<p>hello your reset password link expires in an hour, reset your password now <br/><a href="http://localhost/api/v1/reset_password/yhhytffd657y/yhfjusjhdfsfd@yumiydf123">Reset Password</a>  </p>';
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER_SENDING_EMAIL,
      to: "llavualvine18@gmail.com",
      subject: "Password Reset Email",
      html: emailtemplate,
    });
    console.log("email sent");
    return res.status(200).json({
      status: "success",
      message: "Email Sent successfully... ",
    });
  } catch (error) {
    console.log(error, "email not sent");
    return res.status(500).json({
      status: "failed",
      message: "Email not sent... ",
    });
  }
};

module.exports = { home, login, register, ChangePassword, ResetPassword };
