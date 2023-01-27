const express = require("express");
const router = express.Router();
const AuthenticationMiddleware = require("../middleware/authMiddleware");
const {
  login,
  register,
  dashboard,
  ChangePassword,
  ResetPassword,
} = require("../controllers/AuthenticationController");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(AuthenticationMiddleware, dashboard);
router.route("/change_password").post(AuthenticationMiddleware, ChangePassword);
router.route("/reset_password").post(AuthenticationMiddleware, ResetPassword);

module.exports = router;
