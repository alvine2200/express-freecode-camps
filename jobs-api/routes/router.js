const express = require("express");
const router = express.Router();
const { home, login, register } = require("../controllers/UserController");

router.route("/").get(home);
router.route("/register").post(register);
router.route("/login").post(login);

router.route("/jobs").get(getJobs).post(createJob);
router.route("/jobs/:id").get(editJob).patch(updateJob).delete(deleteJob);

module.exports = router;
