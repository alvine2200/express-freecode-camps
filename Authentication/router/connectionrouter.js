const express = require("express");
const router = express.Router();
const {
  login,
  register,
  dashboard,
} = require("../controllers/AuthenticationController");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(dashboard);

module.exports = router;
