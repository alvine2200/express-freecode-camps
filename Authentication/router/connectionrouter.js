const express = require("express");
const router = express.Router();
const AuthenticationController = require("../controllers/AuthenticationController");

router.route("/", AuthenticationController);

module.exports = router;
