const express = require("express");
const router = express.Router();
const AuthenticationMiddleware = require("../middleware/authMiddleware");
const {
  login,
  register,
  dashboard,
} = require("../controllers/AuthenticationController");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(AuthenticationMiddleware, dashboard);

module.exports = router;
